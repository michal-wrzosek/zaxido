# Zaxido

### Only positive news.

https://zaxido.com

Website filtering out only positive content from Reddit's /r/popular using AI.

Consists of:

- Node.js app querying top reddit API for /r/popular listings and then sending them to OpenAI GPT-3 for sentiment analysis. Output saved in MongoDB.
- Gatsby web app presenting the news from MongoDB
- Github actions pipeline automating news updates and static web app deployment to Netlify

## Authors:

- [Karolina Hamerszmidt](https://github.com/karolinahamerszmidt)
- [Michal Wrzosek](https://github.com/michal-wrzosek)

# Development

## Setting up

Install all dependencies

```bash
yarn
```

Copy `.env.default` files into `.env` and fill them out.

---

This project was generated using [Nx](https://nx.dev).
