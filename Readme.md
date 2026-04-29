# 🤖 AI PR Reviewer — Free CodeRabbit Alternative using Groq & LLaMA

[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Groq](https://img.shields.io/badge/Groq-F55036?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com)
[![LLaMA](https://img.shields.io/badge/LLaMA_3-0467DF?style=for-the-badge&logo=meta&logoColor=white)](https://llama.meta.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> Automatically review Pull Requests using AI — powered by Groq's free LLaMA 3 API. A free, open-source alternative to CodeRabbit Pro and GitHub Copilot PR Review.

---

## ✨ What It Does

Every time a Pull Request is opened in your repo, this GitHub Action automatically:

- 🔍 **Reviews all changed files** for bugs, security issues, and bad practices
- 💬 **Leaves inline comments** on specific lines with exact fix suggestions
- 📋 **Generates a Walkthrough** summarizing what changed and why
- 🔐 **Flags security vulnerabilities** like SQL injection and hardcoded credentials
- 📝 **Writes release notes** summarizing user-facing impact
- 📊 **Creates a Changes table** listing all modified files

---

## 🆚 Why This vs Paid Tools?

| Feature | CodeRabbit Pro | GitHub Copilot | **This Project** |
|---|---|---|---|
| Inline code comments | ✅ | ✅ | ✅ |
| Bug detection | ✅ | ✅ | ✅ |
| Security flagging | ✅ | ✅ | ✅ |
| PR summary | ✅ | ✅ | ✅ |
| Cost | $19/month | $19/month | **$0 forever** |
| Self-hosted | ❌ | ❌ | ✅ |
| Customizable prompts | ❌ | ❌ | ✅ |

---

## 🚀 Quick Setup (2 minutes)

### Step 1 — Get a free Groq API key

Go to [console.groq.com](https://console.groq.com) → Sign up → Create API Key → Copy it

### Step 2 — Add it to your repo secrets

```
GitHub Repo → Settings → Secrets and variables → Actions → New repository secret
Name: GROQ_API_KEY
Value: your_groq_api_key_here
```

### Step 3 — Create the workflow file

Create `.github/workflows/pr-review.yml` in your repo and paste:

```yaml
name: AI PR Reviewer

on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  contents: read
  pull-requests: write

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - name: Run PR Reviewer
        uses: DaniyalFarrukh/pr-reviewer-groq@main
        env:
          OPENAI_API_KEY: ${{ secrets.GROQ_API_KEY }}
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          openai_base_url: 'https://api.groq.com/openai/v1'
          openai_light_model: 'llama-3.1-8b-instant'
          openai_heavy_model: 'llama-3.3-70b-versatile'
```

### Step 4 — Open a PR and watch the magic 🪄

Commit the file to `main`, open any Pull Request, and the bot will automatically review it!

---

## 🐛 Example — What the Bot Catches

Given this buggy code in a PR:

```javascript
function getUserData(userId) {
  const query = "SELECT * FROM users WHERE id = " + userId; // SQL injection
  return db.execute(query);
}

function divide(a, b) {
  return a / b; // no division by zero check
}

const password = "admin123"; // hardcoded credential
```

The bot will automatically comment:

| Line | Issue | Severity |
|---|---|---|
| 10 | SQL Injection vulnerability in `getUserData` | 🔴 Critical |
| 15 | Division by zero not handled in `divide` | 🟡 Medium |
| 18 | Hardcoded credential detected | 🔴 Critical |

And suggest exact code fixes for each issue!

---

## ⚙️ Configuration Options

You can customize the reviewer behavior using these inputs in your workflow:

```yaml
with:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  openai_base_url: 'https://api.groq.com/openai/v1'
  openai_light_model: 'llama-3.1-8b-instant'
  openai_heavy_model: 'llama-3.3-70b-versatile'
  
  # Optional customizations
  max_files: '150'                    # Max files to review per PR
  review_simple_changes: 'false'      # Skip trivial changes
  disable_review: 'false'             # Set true for summary only
  disable_release_notes: 'false'      # Set true to skip release notes
  language: 'en-US'                   # Response language
```

### Available Groq Models

| Model | Speed | Quality | Best For |
|---|---|---|---|
| `llama-3.1-8b-instant` | ⚡ Fast | Good | Simple file summaries |
| `llama-3.3-70b-versatile` | 🐢 Slower | Excellent | Deep code review |
| `mixtral-8x7b-32768` | ⚡ Fast | Great | Long files |

---

## 🛠️ Tech Stack

- **TypeScript** — Core action logic
- **GitHub Actions** — CI/CD trigger and runner
- **Groq API** — Free LLM inference
- **LLaMA 3.1 / 3.3** — Language models for code review
- **OpenAI-compatible API** — Drop-in replacement interface

---

## 📁 Project Structure

```
pr-reviewer-groq/
├── .github/
│   └── workflows/
│       └── pr-review.yml      # Workflow to test this action
├── src/
│   ├── main.ts                # Entry point
│   ├── review.ts              # Core review logic
│   ├── prompts.ts             # AI prompts
│   ├── inputs.ts              # Input handling
│   └── options.ts             # Configuration
├── dist/
│   └── index.js               # Compiled output
├── action.yml                 # GitHub Action definition
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Open an issue for bugs or feature requests
- Submit a PR with improvements
- Star ⭐ the repo if you find it useful

---

## 👤 Author

**Daniyal Farrukh**
- GitHub: [@DaniyalFarrukh](https://github.com/DaniyalFarrukh)
- LinkedIn: [Daniyal Farrukh](https://linkedin.com/in/daniyalfarrukh)

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<p align="center">
  Built with ❤️ as a free alternative to expensive AI code review tools
  <br/>
  If this helped you, drop a ⭐ on the repo!
</p>
