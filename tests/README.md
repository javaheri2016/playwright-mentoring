# Playwright Tests – Portugate Audio 
Automated Playwright tests for the audio download form on [Portugate Audio](https://portugate.pt/audio/). Covers positive, negative, and validation scenarios.

---

## Requirements
- Node.js 
- npm
- Playwright

---

## Installation

git clone https://github.com/javaheri2016/playwright-mentoring
cd playwright-mentoring
npm install

---

## Directory Structure
- photo -  screenshots are saved in this folder with timestamped filenames
- portugate4.spec.ts - contains the full test suite (all test scenarios)
- index.ts - – standalone Playwright script used for:
  - launching the browser,
  - navigating to a webpage,
  - taking a screenshot,
  - and closing the browser.

---

## Running tests
- npx playwright test tests/portugate4.spec.ts

---
 
## Test Scenarios
- valid code → download link appears
- lowercase code → rejected, "Invalid code"
- invalid code → rejected, no download link
- empty input → input marked required, no download link
Utility functions: submitCode, goToForm, assertContainsAndLog
Hooks: beforeEach (accept cookies), afterEach (log download text)

---

## Variables
- validCode – valid code for positive tests
- invalidCode – intentionally invalid code
- ranPassword – random string for negative tests
- formattedDate – timestamp for screenshots

---