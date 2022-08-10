import { memo } from '../utils/memo';
import { wait } from '../utils/wait';
import { sendGPTRequest } from './gpt';

interface SentimentExample {
  title: string;
  subreddit: string;
  sentiment?: string;
}

export const sentimentExamples: SentimentExample[] = [
  {
    title:
      'Better Call Saul S06E11 - "Breaking Bad" - Post-Episode Discussion Thread',
    subreddit: 'betterCallSaul',
    sentiment: 'neutral',
  },
  {
    title: 'One Piece 1056 Spoilers',
    subreddit: 'OnePiece',
    sentiment: 'neutral',
  },
  {
    title: 'What horror movies fucked you up as a child?',
    subreddit: 'AskReddit',
    sentiment: 'negative',
  },
  {
    title: 'Nice handmade wooden crafts!',
    subreddit: 'nextfuckinglevel',
    sentiment: 'positive',
  },
  {
    title: 'Adopted this guy - he needs a name? (OC)',
    subreddit: 'MadeMeSmile',
    sentiment: 'positive',
  },
  {
    title: 'I like her, she seems unstable',
    subreddit: 'funny',
    sentiment: 'neutral',
  },
  {
    title: 'What a downgrade!',
    subreddit: 'dankmemes',
    sentiment: 'neutral',
  },
  {
    title: 'The cute little girl is my cousin AND my daughter',
    subreddit: 'MadeMeSmile',
    sentiment: 'positive',
  },
  {
    title: 'California declares state of emergency over monkeypox outbreak',
    subreddit: 'news',
    sentiment: 'negative',
  },
  {
    title:
      "Karen goes to a plantation but doesn't want to learn about slavery.",
    subreddit: 'FuckYouKaren',
    sentiment: 'negative',
  },
  {
    title:
      'I Am a (former) Domino’s pizza worker (UK). From how the pizza tracker works to the most unhygienic practices, I’ve seen it all- AMA.',
    subreddit: 'IAmA',
    sentiment: 'neutral',
  },
  {
    title:
      'Last night some thugs showed up to a local liquor store (Norco, California) with AR’s and the store owner pulled out a shotgun! This is crazy!!!',
    subreddit: 'JusticeServed',
    sentiment: 'negative',
  },
];

interface GetSentimentPromptProps {
  title: string;
  subreddit: string;
}

export function getSentimentPrompt({
  title,
  subreddit,
}: GetSentimentPromptProps) {
  return [...sentimentExamples, { title, subreddit }]
    .map((example) =>
      [
        `title: ${example.title}`,
        `subreddit: ${example.subreddit}`,
        `sentiment:${example.sentiment ? ' ' + example.sentiment : ''}`,
      ].join(`\n`)
    )
    .join(`\n\n`);
}

export interface SentimentInput {
  id: string;
  title: string;
  subreddit: string;
}

interface GetSentimentProps {
  input: SentimentInput;
}

export type Sentiment = 'positive' | 'neutral' | 'negative';

export async function getSentiment({
  input: { title, subreddit },
}: GetSentimentProps): Promise<Sentiment> {
  const prompt = getSentimentPrompt({ title, subreddit });

  const response = await sendGPTRequest('text-ada-001', {
    prompt,
    max_tokens: 10,
    temperature: 0.3,
    stop: `/n`,
  });

  const line = response.data.choices[0].text.split('\n')[0] as string;
  const sentiment = line.trim();

  if (
    sentiment !== 'positive' &&
    sentiment !== 'neutral' &&
    sentiment !== 'negative'
  )
    throw new Error(
      'Invalid sentiment response from GPT3 ' +
        JSON.stringify(
          { prompt, sentiment, choices: response.data.choices },
          null,
          2
        )
    );

  return sentiment;
}

export type InputIdToSentimentMap = Record<string, Sentiment>;

interface GetSentimentsForListingsProps {
  inputs: SentimentInput[];
}

export async function getSentiments({
  inputs,
}: GetSentimentsForListingsProps): Promise<InputIdToSentimentMap> {
  // eslint-disable-next-line prefer-const
  let listingIdToSentiment: Record<string, Sentiment> = {};

  for (const input of inputs) {
    const sentiment = await memo(
      `get-sentiment-for-a-listing-${input.id}`,
      async () => {
        // Wait to not fire too many requests to OpenAI GPT3 API
        await wait(1000);

        return getSentiment({ input });
      }
    );

    listingIdToSentiment[input.id] = sentiment;
  }

  return listingIdToSentiment;
}
