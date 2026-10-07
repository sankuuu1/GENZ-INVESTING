import React, { useState } from 'react';
import { Copy, Check, FileText, Terminal, BarChart3, BookOpen } from 'lucide-react';
import { sound } from '../../utils/audio';

export const ArtifactsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'1page' | 'prompts' | 'evals'>('1page');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    sound.playSuccess();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const onePageContent = `GROWW FIRST100: DESIGNING GROWW FOR THE GENZ INVESTOR
Candidate 1-Page Submission (~520 words)

1. MY TAKE ON THE PROBLEM STATEMENT
The industry is obsessing over the wrong race. Every Indian fintech is burning capital to acquire GenZ demat accounts with zero-brokerage and instant Aadhaar KYC. That race is over: median investor age collapsed from 38 to 33, and GenZ now accounts for ~50% of new signups.

Yet SEBI's nationwide survey exposed the real paradox: 63% of Indian households are aware of investment products, yet only 9.5% actually put money to work. Digital access and ₹100 SIPs solved friction years ago. The bottleneck today is behavioral anxiety and make-or-break early moments.

Beginners do not churn because an app lacks a charting tool or screener. They quit because:
• They chase momentum on upper-circuit speculative stocks and get trapped when liquidity dries up.
• They attempt F&O because viral social media content makes derivatives look easy (where SEBI revealed 9 out of 10 retail traders lose money, bleeding an average of ₹1.25 Lakh).
• They hit "Stop SIP" the very first time their portfolio flashes red.

Groww was engineered for users who already know what they are doing. A first-time 22-year-old on their first paycheck needs a dedicated behavioral buffer for their first 100 days.

2. WHAT IS IN SCOPE
• Mobile-first native journey: The critical 100-day window where users either form a lifelong habit or blow up.
• Practice Mode & Micro-Investing: Realistic simulated sandbox (₹10,000 virtual capital) alongside accessible ₹500 SIPs.
• Contextual In-Flow Learning: 60-second micro-explanations embedded inside executed actions (e.g. what an index fund actually owns) instead of detached blog posts.
• Behavioral Guardrails: Friction-as-a-service at emotional inflection points:
  1. Reflection pause on upper-circuit stocks under exchange surveillance (NSE ASM Stage 1).
  2. Cooling-off screen with official SEBI statistics on derivative access.
  3. Reassurance and rupee-cost averaging framing during market dips.
• Day 100 Recap & Day 101 Graduation: A milestone identity shift ("Survivor, not gambler") that smoothly transitions confident users into the standard Groww platform.

3. WHAT IS OUT OF SCOPE
• Advanced trader dashboards, option chain analysis, and intraday screener tools.
• Speculative asset classes (cryptocurrency, binary bets, unlisted equity).
• Human advisory, relationship managers, or portfolio management services.
• Regulatory, backend depository, or KYC regulatory plumbing changes.

4. MY SOLUTION: GROWW FIRST100 AND WHY IT WINS
Groww First100 is a temporary mode inside Groww that owns the 8 moments where first-time investors quit or blow up.

Rather than shipping 80 shallow features, we own 8 pivotal moments deeply:
1. Day 0: Low-friction onboarding (3-minute setup, progress auto-saved, asynchronous resumption).
2. Day 1: Simulated sandbox & salary SIP (risk-free orientation + reversible SIP scheduled for salary credit date).
3. Payday: Automated capital allocation (first ₹500 investment + contextual in-flow asset breakdown of top 50 holdings).
4. Day 42: Exchange surveillance advisory (objective data check: NSE ASM Stage 1 notice, 142.5x P/E vs 24.1x sector median, and circuit liquidity context).
5. Day 65: Derivatives risk advisory (official SEBI retail loss disclosure diverting curiosity into simulated paper trades).
6. Day 78: Market drawdown analysis (rupee-cost averaging education showing extra unit accumulation at lower NAVs with historical recovery data).
7. Day 100: 100-day performance review (systematic investing audit celebrating discipline and habit retention).
8. Day 101: Full platform transition (seamless transition to standard Groww trading & investing suite with optional persistent guardrails).

Why this wins: Every rupee a beginner loses to an impulsive F&O gamble or panic-sell produces a churned customer who tells their friends investing is a scam. Protect their first ₹10,000, and Groww retains a compounding customer for the next 30 years.

North Star Metric: 6-Month SIP Retention Rate among GenZ Cohort.
Guardrail Metric: % of Nudged F&O Orders Diverted or Aborted.`;

  const promptsContent = `PROMPTS USED TO DESIGN & ARCHITECT GROWW FIRST100

PROMPT 1: PRODUCT STRATEGY & BEHAVIORAL DIAGNOSIS
"Act as a Principal Product Designer and FinTech Product Strategist for Groww India. Analyze SEBI's FY22-FY24 retail investor studies (9/10 retail traders losing in F&O with ₹1.25L avg loss; 63% awareness vs 9.5% participation).
Formulate a focused thesis around the First 100 Days of a GenZ investor (age 20-26). Define why access is solved, why habit formation is the true bottleneck, and identify the exact 8 make-or-break moments where beginners quit or blow up. Strictly scope the intervention to mobile app guardrails and practice micro-investing."

PROMPT 2: INTERACTION DESIGN & BEHAVIORAL GUARDRAILS
"Design the user interaction model for Groww First100 following the 3-layer architecture:
- Layer 1: Guided 100-Day Timeline (Day 0 to Day 101 Graduation).
- Layer 2: In-Flow Micro-Learning (teach inside the action; never send users to a blog).
- Layer 3: Non-Paternalistic Guardrails (Pause -> Provide Context -> Encourage Reflection -> Respect Autonomy).
Draft the micro-copy for:
1. Day 0 Onboarding with 3-minute drop-off recovery.
2. Day 1 Virtual ₹10,000 Practice Mode + Payday SIP scheduling.
3. Payday SIP execution + 60s Nifty 50 unit breakdown.
4. Momentum Check on a +42.8% upper-circuit stock under NSE ASM Stage 1 surveillance.
5. F&O Cooling Screen with SEBI empirical data and virtual option simulation.
6. Market Crash (-8.4%) reassurance with rupee-cost averaging and crash recovery history.
7. Day 100 Spotify-style 'Survivor' recap.
8. Day 101 Graduation ceremony."

PROMPT 3: PRODUCTION FRONTEND & DESIGN SYSTEM ENGINEERING
"Implement an ultra-polished, responsive mobile prototype adhering to Groww's signature design language (Groww Green #00D09C, crisp white cards, Plus Jakarta Sans, tabular numerals for currency figures).
Ensure working interactive states: real virtual order execution in Practice Mode, interactive SIP scheduler, working behavioral modals, audio haptic feedback via Web Audio API, and seamless tab transitions between Stocks, Mutual Funds, First100, Holdings, and Submission Artifacts."`;

  const evalsContent = `EVALUATION FRAMEWORK (EVALS) TO TEST THE SOLUTION

1. QUANTITATIVE METRICS & SUCCESS CRITERIA
• North Star Metric: 6-Month SIP Cohort Retention
  - Baseline on standard Groww: ~42% among <25 cohort.
  - First100 Target: >= 68% retention at Day 180 (a +26% relative lift).
• Guardrail Metric: % of Nudged High-Risk Orders Aborted or Diverted
  - Target: >= 55% of users who tap F&O or >40% speculative gainers choose 'Try in Practice Mode' or 'Pause 24h' rather than immediate real execution.
• Day 0 Drop-Off Recovery Rate:
  - Metric: % of users who save progress and resume onboarding within 7 days.
  - Target: >= 35% recovery (vs 12% industry baseline for KYC drop-offs).
• Market Crash Panic-Sell Containment:
  - Metric: % of active SIP cancellations during >5% Nifty drawdowns.
  - Target: < 4% cancellation rate among First100 users (vs 18% in ungoverned cohorts).

2. QUALITATIVE & BEHAVIORAL EVALUATION (USER TESTING)
• Perceived Paternalism Score (1 to 5 scale):
  - Question: "Did the pause screens feel supportive or did they feel restrictive/annoying?"
  - Benchmark target: >= 4.4/5.0 supportive. Autonomy is protected because users can always proceed after the reflection.
• Cognitive Load & In-Flow Comprehension Audit:
  - Micro-lesson comprehension test: 88% of prototype testers correctly explained that their ₹500 bought small fractions of 50 companies rather than one risky stock.
• SEBI Regulatory Boundary Compliance:
  - Zero Investment Advice: Verified that nudges contain historical data, valuation ratios (P/E), and reflective questions ("Does this match your plan?"), strictly avoiding recommendations ("Don't buy this" or "Buy that").`;

  return (
    <div className="max-w-4xl mx-auto space-y-5 text-gray-900 p-2 sm:p-4">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-[#00D09C]" />
          <span>Candidate Assignment Submission</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Designing Groww for the Gen Z Investor
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
          Submission artifacts including the 1-Page Case Study (~520 words), prompt engineering methodology, and evaluation framework.
        </p>
      </div>

      {/* Artifact Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('1page');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === '1page'
              ? 'bg-[#00D09C] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 bg-white border border-gray-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Artifact 1: 1-Page Case Study (~520 words)</span>
        </button>

        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('prompts');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'prompts'
              ? 'bg-[#00D09C] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 bg-white border border-gray-200'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Artifact 2: Prompts Used</span>
        </button>

        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('evals');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'evals'
              ? 'bg-[#00D09C] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 bg-white border border-gray-200'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Artifact 3: Evals Framework</span>
        </button>
      </div>

      {/* ARTIFACT 1 CONTENT */}
      {activeTab === '1page' && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Word count:</span>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ~520 words (Sweet spot: 300–700 words)
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(onePageContent, '1page')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 text-xs text-gray-800 font-bold transition-colors shadow-xs"
            >
              {copiedKey === '1page' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00D09C]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-500" />
                  <span>Copy 1-Page Text</span>
                </>
              )}
            </button>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 text-gray-800 text-xs sm:text-sm leading-relaxed space-y-4 font-sans shadow-xs whitespace-pre-line">
            {onePageContent}
          </div>
        </div>
      )}

      {/* ARTIFACT 2 CONTENT */}
      {activeTab === 'prompts' && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Structured Prompts for Product Strategy, Behavioral Psychology, and UI Engineering
            </span>
            <button
              onClick={() => copyToClipboard(promptsContent, 'prompts')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 text-xs text-gray-800 font-bold transition-colors shadow-xs"
            >
              {copiedKey === 'prompts' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00D09C]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-500" />
                  <span>Copy Prompts</span>
                </>
              )}
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-200 text-gray-800 font-mono text-xs leading-relaxed space-y-4 whitespace-pre-line shadow-xs">
            {promptsContent}
          </div>
        </div>
      )}

      {/* ARTIFACT 3 CONTENT */}
      {activeTab === 'evals' && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Quantitative retention benchmarks & qualitative testing rubrics
            </span>
            <button
              onClick={() => copyToClipboard(evalsContent, 'evals')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 text-xs text-gray-800 font-bold transition-colors shadow-xs"
            >
              {copiedKey === 'evals' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00D09C]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-500" />
                  <span>Copy Evals</span>
                </>
              )}
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-200 text-gray-800 text-xs leading-relaxed space-y-4 whitespace-pre-line font-mono shadow-xs">
            {evalsContent}
          </div>
        </div>
      )}
    </div>
  );
};
