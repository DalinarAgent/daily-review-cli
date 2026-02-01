#!/usr/bin/env node

/**
 * daily-review CLI
 * 5-minute daily reflection tool for agents & humans
 * 
 * Usage: daily-review [--memory-path PATH] [--format json|md]
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Configuration
const MEMORY_PATH = process.env.DALINAR_MEMORY_PATH || 
                   path.join(process.env.HOME, '.openclaw/workspace/memory');
const FORMAT = process.argv.includes('--format=json') ? 'json' : 'md';

// Questions for daily review
const QUESTIONS = [
  { id: 'outputs', prompt: '1. What shipped today? (files, changes, links)\n> ' },
  { id: 'learning', prompt: '2. One learning? (1 sentence)\n> ' },
  { id: 'decision', prompt: '3. One decision? (what + why)\n> ' },
  { id: 'tomorrow', prompt: '4. Tomorrow priority? (1 sentence)\n> ' },
  { id: 'pulse', prompt: '5. Pulse check? (🟢 good / 🟡 okay / 🔴 blocked)\n> ' }
];

/**
 * Get today's date in YYYY-MM-DD format
 */
function getTodayDate() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * Get memory file path for today
 */
function getMemoryFilePath() {
  const date = getTodayDate();
  return path.join(MEMORY_PATH, `${date}.md`);
}

/**
 * Format review as Markdown
 */
function formatMarkdown(answers) {
  const date = getTodayDate();
  return `## Daily Review ${date}

**Outputs:** ${answers.outputs}

**Learning:** ${answers.learning}

**Decision:** ${answers.decision}

**Tomorrow:** ${answers.tomorrow}

**Pulse:** ${answers.pulse}
`;
}

/**
 * Format review as JSON
 */
function formatJSON(answers) {
  return JSON.stringify({
    date: getTodayDate(),
    timestamp: new Date().toISOString(),
    outputs: answers.outputs,
    learning: answers.learning,
    decision: answers.decision,
    tomorrow: answers.tomorrow,
    pulse: answers.pulse
  }, null, 2);
}

/**
 * Save review to file
 */
function saveReview(answers) {
  try {
    const filePath = getMemoryFilePath();
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Format review
    const content = FORMAT === 'json' ? formatJSON(answers) : formatMarkdown(answers);
    
    // Append to file (or create if doesn't exist)
    if (fs.existsSync(filePath) && FORMAT === 'md') {
      fs.appendFileSync(filePath, '\n' + content);
    } else {
      fs.writeFileSync(filePath, content);
    }
    
    console.log(`\n✅ Review saved to: ${filePath}`);
    return true;
  } catch (err) {
    console.error(`❌ Error saving review: ${err.message}`);
    return false;
  }
}

/**
 * Interactive review loop
 */
function startReview() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const answers = {};
  let currentQuestion = 0;

  function askNextQuestion() {
    if (currentQuestion >= QUESTIONS.length) {
      rl.close();
      const success = saveReview(answers);
      
      if (success) {
        console.log('\n📝 Daily Review Complete!');
        console.log('   Keep shipping. Keep learning. 🎯');
      }
      return;
    }

    const question = QUESTIONS[currentQuestion];
    rl.question(question.prompt, (answer) => {
      answers[question.id] = answer.trim();
      currentQuestion++;
      askNextQuestion();
    });
  }

  console.log('📝 Daily Review (5 minutes)\n');
  askNextQuestion();
}

// Entry point
if (require.main === module) {
  startReview();
}

module.exports = { startReview, formatMarkdown, formatJSON };
