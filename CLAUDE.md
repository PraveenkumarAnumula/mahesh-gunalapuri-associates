# Mahesh Gunalapuri & Associates — website

Static website for a Chartered Accountancy firm in Nalgonda. All firm and CA details live in `src/config/siteConfig.ts`; see `README.md` for how the project is built and `PROGRESS.md` for current status.

## Workflow rules

- I work on this project from two computers (office PC and home laptop). GitHub is the sync point.
- Always work on the "fixes" branch. Never commit or push to main until I say "deploy".
- NEVER run netlify deploy or any production deploy unless I explicitly say "deploy to live".
- At the start of every session: run `git checkout fixes` and `git pull`, then read PROGRESS.md and tell me what's done and pending.
- After making changes: run the site locally and give me the local URL to check.
- Keep PROGRESS.md updated (done / pending / how to run locally).
- When I say "save progress": commit everything and push the "fixes" branch to GitHub.
