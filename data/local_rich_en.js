window.LOCAL_RICH_EN = {
  "uciml/iris": {
    "title": "Iris Flower Data (EN)",
    "desc": "The classic dataset introduced by R.A. Fisher in 1936 — often called the \"Hello World\" of statistical classification. It contains 4 morphological measurements for 150 iris flowers, split evenly across 3 species (setosa / versicolor / virginica), 50 each.",
    "cols": [
      {
        "n": "sepal length (cm)",
        "t": "float",
        "r": "feature",
        "d": "sepal length"
      },
      {
        "n": "sepal width (cm)",
        "t": "float",
        "r": "feature",
        "d": "sepal width"
      },
      {
        "n": "petal length (cm)",
        "t": "float",
        "r": "feature",
        "d": "petal length"
      },
      {
        "n": "petal width (cm)",
        "t": "float",
        "r": "feature",
        "d": "petal width"
      },
      {
        "n": "species",
        "t": "category",
        "r": "target",
        "d": "species: setosa/versicolor/virginica"
      }
    ],
    "target": "species (3 classes)",
    "quality": [
      "150 rows × 5 cols, no missing values",
      "perfectly balanced classes (50 each)",
      "setosa is linearly separable from the other two; versicolor and virginica overlap",
      "features share a similar scale (cm), usually no heavy scaling needed"
    ],
    "tasks": [
      "Multi-class classification (3 classes)",
      "Clustering (unsupervised validation)"
    ],
    "models": [
      "Baseline: KNN / Linear Discriminant Analysis (LDA), accuracy ~96%+",
      "Advanced: SVM (linear kernel), decision tree, naive Bayes",
      "Teaching use: visualization (scatter matrix / PCA dimensionality reduction)"
    ],
    "limits": [
      "Tiny sample (only 150); not suitable for assessing real generalization",
      "Only 4 morphological dimensions, no ecological/genetic context",
      "Labels are \"perfect\" human annotations that hide real-world noise"
    ],
    "source": "UCI Machine Learning Repository (Fisher, 1936)",
    "license": "CC BY 4.0 (UCI)",
    "results": [
      "LDA & k-NN: ~97% accuracy (5-fold CV)",
      "Random forest & SVM (nonlinear kernel): ~96%",
      "Logistic regression: ~95%",
      "Perceptron (single-layer): only ~73% — the failure that motivated multi-layer networks"
    ],
    "cite": "Fisher, R.A. (1936). The use of multiple measurements in taxonomic problems.",
    "writeup": "**One-line takeaway**: Iris is machine learning's most famous \"starter workbook\" — with 150 flowers and 4 measurements it shows most clearly how to teach a computer to tell three things apart. The good news: any ordinary algorithm today gets 95%–97% right. The bad news (and its real value): because it is so simple, it can no longer tell us \"which AI is smarter.\"\n\n### What is this dataset really about?\nIn 1936, statistician Ronald Fisher took 150 iris flowers and measured 4 sizes for each: sepal length, sepal width, petal length, petal width (all in centimeters), then had experts label which of three varieties it belonged to — setosa, versicolor, virginica, exactly 50 of each.\n\nThink of it as 150 photos of flowers on a table, with 4 clues (the 4 sizes) beside each, and the task is to guess which flower each photo shows. What the computer must learn is the rule: \"given a set of measurements, which variety should I guess?\"\n\nWhy is it so famous? Almost every textbook that teaches AI or classification uses it in lesson one. The spam filter on your phone, the bank's fraud detection, the hospital's tool that reads scans to guess a diagnosis — the underlying logic is identical to this \"guess the flower\" puzzle; only the clues grow from 4 to thousands. So understanding Iris means understanding the minimal template of \"how AI learns to classify.\"\n\n### Results: how accurate are the models really?\nWe use a standard method called 5-fold cross-validation: split the 150 flowers randomly into 5 groups, hide one group as the \"exam,\" train on the other four, then let the model guess the hidden batch; repeat 5 times and average — the closest to true performance.\n\nThe scores are remarkably tidy:\n- Linear Discriminant Analysis (LDA) and k-Nearest Neighbors (k-NN): about **97%** correct;\n- Random forest and SVM with a nonlinear kernel: **about 96%** correct;\n- Logistic regression: about **95%** correct.\n\nThe point is not \"who is higher\" (that 1%–2% is within exam noise, not a real gap) but that **everyone approaches 97%**. For a 3-way guess, blind guessing is only 33% right; any decent method now clears 95%+ — meaning this problem has been \"solved to death.\"\n\n### The real lesson: why Iris can't rank AI models\nPrecisely because every model scores 95%–97%, Iris loses its function as a referee. Analogy: you want to compare two math professors, but only give them \"count from 1 to 10\" — both get full marks and you learn nothing. Industry today compares models on hard benchmarks that actually separate them — ImageNet (1.4M images, 1000 classes), GLUE (language understanding); Iris is just \"preschool arithmetic.\"\n\nSo Iris's correct use is as a **teaching and coding \"hello world\"**: you finish a classifier, run it on Iris, reach 95%+ and know your code isn't broken; but never brag \"97% on Iris\" as proof your model is great — anyone in the field sees it's a basic problem.\n\n### Three \"aha\" findings hidden in the data\n1. **One flower is easy to recognize.** setosa does not overlap the other two in size at all — separated like \"apples and oranges\"; the model almost never mislabels setosa. Real confusion happens almost entirely between versicolor and virginica — they look too alike, the boundary is fuzzy.\n2. **You don't need all 4 sizes, 2 are enough.** Research shows just \"petal length + petal width\" basically separates the three classes; the two sepal sizes help little. This reveals a universal truth: in much data, only one or two clues truly matter, the rest is noise.\n3. **Two ways to draw a dimensionality-reduced plot.** Compress the 4 sizes into 2 \"synthetic sizes\" as a scatter: PCA simply compresses information (its first two components explain ~96% of variance) yet versicolor and virginica still blur together; LDA compresses while \"deliberately staring at the class difference,\" and the three classes separate into three clear clusters. That is the difference between \"reduce dimension to classify\" and \"reduce dimension to compress.\"\n\n### A cautionary tale: why the perceptron only got 73%\nThe earliest neural-network prototype, the perceptron, scored only about **73%** on Iris — clearly below the others. The reason is classic: the boundary between versicolor and virginica is not a single straight line (technically \"nonlinear\"), while a single-layer perceptron can only draw straight lines. This failure spurred the invention of \"multi-layer neural networks\" — today's deep learning boom has its roots in this 73% lesson. So it is not a model's shame but a textbook case of \"why we need more complex structure.\"\n\n### As an ordinary reader, what can you learn from Iris?\n- If you want to enter AI: it is the best \"exercise\" for your first classifier — runnable in half an hour, and you can directly see which flowers are easy or hard to separate.\n- If you use AI: it reminds you bluntly — **a model scoring high on one problem does not mean it is truly smart**; judge it on hard, real-world problems.\n- If you build products/decisions: Iris proves \"clean, clearly-labeled small data\" is enough to explain a principle, but to actually deploy you must switch to larger, dirtier, more real data.\n\n### Honest limitations (don't be fooled by 97%)\nIris has only 150 flowers and 4 sizes — a \"perfect sample\" measured and labeled by hand nearly 90 years ago: no missing values, no measurement error, exactly 50 per class. In the real world, data runs to tens of thousands of rows, carries noise, and has severely imbalanced classes. So 97% on Iris **absolutely does not mean** your system has 97% in real business. It is a great starting point for understanding principles, but never the finish line for validating ability.\n\n### Summary\nIris's value was never in being \"hard\" but in being \"clear\": with minimal data it explains classification, cross-validation, feature importance, dimensionality reduction, model boundaries, and overfitting all at once. Treat it as a textbook, not a leaderboard — that is the one sentence an ordinary person should take away from this dataset."
  },
  "spscientist/students-performance-in-exams": {
    "title": "Student Exam Scores (EN)",
    "desc": "Demographic and schooling background of 1,000 students, plus their math, reading, and writing scores (0–100). Good for exploring educational equity, resource investment vs. performance, and score prediction.",
    "cols": [
      {
        "n": "gender",
        "t": "category",
        "r": "feature",
        "d": "gender"
      },
      {
        "n": "race/ethnicity",
        "t": "category",
        "r": "feature",
        "d": "racial/ethnic group"
      },
      {
        "n": "parental level of education",
        "t": "category",
        "r": "feature",
        "d": "parent's education level"
      },
      {
        "n": "lunch",
        "t": "category",
        "r": "feature",
        "d": "lunch subsidy (socioeconomic proxy)"
      },
      {
        "n": "test preparation course",
        "t": "category",
        "r": "feature",
        "d": "took test-prep course"
      },
      {
        "n": "math score",
        "t": "int",
        "r": "target",
        "d": "math score 0–100"
      },
      {
        "n": "reading score",
        "t": "int",
        "r": "target",
        "d": "reading score 0–100"
      },
      {
        "n": "writing score",
        "t": "int",
        "r": "target",
        "d": "writing score 0–100"
      }
    ],
    "target": "three scores (regression) or pass/fail (classification)",
    "quality": [
      "1000 rows × 8 cols, no missing values",
      "three scores are highly correlated (multi-output per student)",
      "lunch is a strong proxy for socioeconomic status"
    ],
    "tasks": [
      "Multi-output regression (predict scores)",
      "Classification (pass/fail)"
    ],
    "models": [
      "Baseline: linear regression / random forest (multi-output)",
      "Model the three subjects jointly to exploit their correlation",
      "Beware correlation ≠ causation (e.g., lunch vs. score)"
    ],
    "limits": [
      "Only a specific US K-12 sample; external generalization is limited",
      "Correlation should not be read as causation",
      "n=1000; smaller after subgroup splits"
    ],
    "source": "Kaggle (spscientist)",
    "license": "CC0",
    "results": [
      "Regression R² ≈ 0.80+ (reading/writing higher, math slightly lower)",
      "Took test-prep: average +5 to +10 points",
      "lunch / test-prep / parent education strongest positive correlates"
    ],
    "cite": "Kaggle Students Performance in Exams Dataset.",
    "writeup": "**One-line takeaway**: This data on 1,000 students confirms something many parents sense but can't prove — kids from better-off families who also took test prep score higher on average; but \"correlated\" is not \"taking cram school guarantees a boost,\" and the real issue hidden behind it is the wealth gap. The data punctures the \"effort alone conquers all\" myth, and incidentally teaches the most-misunderstood skill of the data age: telling **correlation from causation**.\n\n### What is this dataset really about?\nThe data records the background and scores of 1,000 students. Background has 5 items: gender, race/ethnicity, parent education level, whether they get a lunch subsidy (a stand-in for family income, since only poor families qualify), and whether they took a test-prep course. Scores are math, reading, and writing, each 0–100.\n\nThink of it as placing each student's \"family situation\" next to their \"score\" to see which backgrounds move with performance. It is often used to discuss educational equity — same classroom, why do some do well and some poorly? Everyone cares about this to some degree, especially families with kids, and the data turns \"I feel\" into \"the data says,\" giving policy debates a testable object instead of guesswork.\n\n### The three scores move together\nAn interesting pattern: one student's three scores are highly correlated. A good math student usually isn't bad at reading or writing. This suggests a shared core ability (comprehension, logic, study habits), so you can model the three subjects together and borrow their mutual signal — more stable than scoring each alone. The field calls this multi-output regression: predict several related targets at once, cross-checking each other. It also hints: cramming one subject may lift others, because the underlying ability is shared — a hint for \"should I enroll in every subject's cram class?\": build the foundational ability (reading, logic) first; it may pay off more than tutoring every subject.\n\n### Results: what correlates most with scores?\nResearch finds that lunch subsidy (tied to family income), test-prep course, and parent education correlate most strongly and positively with scores. Fit a regression model (find the line that best fits the data to predict the score) and the common R² is about 0.80+ — higher for reading/writing, slightly lower for math. R² closer to 1 means the model explains more; 0.80 is quite good, showing family background does explain a large chunk of score variation — but not all. The remaining ~20% is effort, teachers, luck, things not recorded, so don't reduce a person to a few numbers.\n\nMore concretely: students who took test prep average 5–10 points higher. That is a visible, intervenable factor — unlike unchangeable family background, taking prep is something schools and families can actively do. A practical signal for parents: last-minute prep helps somewhat, but only if the family could already afford it and the child already had a foundation; otherwise the course itself is another resource poorer kids may not access.\n\n### Correlation ≠ causation — this matters\nWe must pour cold water here: lunch subsidy correlating with high scores does NOT mean \"give lunch subsidies and scores rise.\" The real cause is likely the family income behind it — wealthy families have more resources (tutoring, books, quiet study rooms, parent tutoring time). Statistically this is correlation ≠ causation. Get this step wrong and policy prescribes the wrong medicine: hand out subsidies without resources, and scores may not budge.\n\nA everyday example: ice-cream sales and drowning deaths are highly correlated, not because eating ice cream drowns people, but because summer raises both. Likewise, lunch subsidy and scores correlate, but the true culprit is the shared cause \"poverty.\" See this and you won't be led by numbers, and you can treat the root rather than the symptom — not just handing poor families subsidies while ignoring their lack of time, quiet space, and tutoring.\n\n### Why should ordinary people care?\nIf you are a student or parent, the data confirms the value of \"preparation\": that 5–10 points from prep is real, so prepare seriously before exams — don't buy \"just wing it.\" If you make education policy, it reminds you: the score gap reflects a family-resource gap; staring at scores hides structural problems. What truly needs fixing is resource inequality, not just the exam room. For a society this is more fundamental and harder than opening more cram schools — but the data points at where the difficulty lies; the rest is politics and resources.\n\n### Real-world connection\nSchools can use such analysis to flag students likely to fall behind and help them early (e.g., free prep classes, extended Q&A for resource-poor kids). But it only says \"who is more likely to do well,\" not \"why,\" and gives no causal prescription — e.g., it cannot prove \"switching schools raises scores,\" because the school itself is entangled with location and family. Real education decisions need randomized controlled trials, not a correlation table — which is why education research is far more cautious than it looks; children's futures can't bear guesswork.\n\n### Common misconceptions\nMisconception 1: low score = not trying — data clearly show family is a strong factor; blaming the child is unfair. 2: taking prep = safe — those 5–10 points are an average, built on a family that could already afford it. 3: using correlation to blame families, ignoring structural responsibility. 4: R² 0.8 = \"found the key to scores\" — it explains only 80%; the rest is effort, teachers, luck, unrecorded. Don't turn a complex person into a slave of a few variables.\n\n### Honest limitations\nFirst, the sample is only a specific US K-12 group; another country or system may not hold. Second, correlation isn't causation, especially a proxy like lunch subsidy that stands for the whole family context. Third, only 1,000 people; after splitting by ethnicity and gender each group shrinks and conclusions wobble — not a universal theorem of human education, and certainly not ammo for \"the poor deserve it.\"\n\n### Summary\nThe student-score data, with 1,000 samples, shows clearly: family and prep do correlate positively with scores, and prep brings a visible 5–10 points; but correlation is not causation, and the wealth gap behind the lunch subsidy is the real problem. It is a good starting point for understanding educational equity and regression modeling, not a policy panacea. Read it and you'll better understand \"the story behind the score,\" and weigh \"because/therefore\" more carefully — that restraint is the line separating \"understands data\" from \"is led by data\": when you see two things correlate, first resist blurting \"therefore,\" because that step is where you most easily fall into the pit."
  },
  "uciml/mushroom-classification": {
    "title": "Mushroom Edibility (EN)",
    "desc": "From the UCI Mushroom dataset: 8,124 mushrooms described by 22 features (cap shape, odor, habitat, etc.), with the goal of classifying each as edible or poisonous — a classic case study for interpretable decision trees.",
    "cols": [
      {
        "n": "cap-shape / cap-surface / cap-color",
        "t": "category",
        "r": "feature",
        "d": "cap shape/surface/color"
      },
      {
        "n": "gill-... (attachment/color/...)",
        "t": "category",
        "r": "feature",
        "d": "gill-related"
      },
      {
        "n": "stalk-... (shape/color/...)",
        "t": "category",
        "r": "feature",
        "d": "stalk-related"
      },
      {
        "n": "odor",
        "t": "category",
        "r": "feature",
        "d": "odor (very strong predictor)"
      },
      {
        "n": "habitat / population",
        "t": "category",
        "r": "feature",
        "d": "habitat/population"
      },
      {
        "n": "class",
        "t": "category",
        "r": "target",
        "d": "e=edible / p=poisonous"
      }
    ],
    "target": "class (e/p binary)",
    "quality": [
      "8124 rows × 23 cols (22 features + class); classic version has no missing values",
      "classes e/p; odor almost perfectly separates them",
      "all categorical (no continuous variables)"
    ],
    "tasks": [
      "Binary classification (edible/poisonous)",
      "Interpretability teaching"
    ],
    "models": [
      "Baseline: decision tree (read rules directly, e.g., odor=none almost surely edible)",
      "Compare: naive Bayes, random forest",
      "Beware 100% accuracy may signal leakage or oversimplification"
    ],
    "limits": [
      "Only descriptive morphology/habitat, no molecular toxicity evidence",
      "Old data (collected 1981); species taxonomy has since evolved",
      "edible/poisonous binary hides \"conditionally edible\" gray zones — do NOT forage based on it"
    ],
    "source": "UCI Machine Learning Repository (1981)",
    "license": "CC BY 4.0 (UCI)",
    "results": [
      "Decision tree: ~100% accuracy on test set",
      "Random forest: ~100%",
      "Logistic regression: 97%–99.8%",
      "Odor alone (OneR single rule): ~98.5%; odor ~61–63% of feature importance"
    ],
    "cite": "Schlimmer, J. (1981). Concept Acquisition Through Representational Adjustment.",
    "writeup": "**One-line takeaway**: In these 8,124 mushroom records, the computer can almost perfectly tell poisonous from edible — but remember: this is a pattern inside the data, NOT a field guide for foraging. Rely on it to pick mushrooms and people die. Its real value is teaching us how to read a \"white-box\" model, and why a perfect score should make you suspicious — not encouraging anyone into the woods. That red line is harder than any analysis conclusion.\n\n### What is this dataset really about?\nThe data records 8,124 mushrooms, each with 22 descriptive features: cap shape, surface, color; gill appearance and color; stalk shape and color; odor; growth habitat and population, etc. One goal: is this mushroom edible or poisonous? All features are categorical — e.g., odor might be \"none, foul, pungent\" as text options, no continuous numbers.\n\nThink of it as giving each mushroom a \"feature ID card\" and letting the computer learn \"which feature combo equals poisonous.\" It is the classic case for teaching decision trees (a model like a flowchart that reads out rules directly) — you can even print the model and check mushroom by mushroom; every \"if-then\" step is understandable. When AI is often scolded as a \"black box,\" this counterexample is precious: it proves a model can be transparent like a manual, auditable by anyone.\n\n### Why can it score 100?\nModel with a decision tree, accuracy on the exam hits 100%; random forest (voting many trees) also ~100%; even simpler logistic regression (weighted sum as a yes/no) gets 97%–99.8%. The reason is blunt: there is a super-strong signal — odor.\n\nResearch shows that using only odor, with one naive rule (e.g., a certain odor means poisonous; technically OneR single rule), already reaches 98.5% accuracy. Specifically, \"none\" odor is mostly edible, while \"foul\" or \"pungent\" is mostly poisonous. In decision-tree importance, odor accounts for ~61%–63%, bruise traces ~16%. One rule nearly clears the game — that's why the score is suspiciously high: the data happens to hide a near-decisive clue; the model grabs it and wins without learning anything else. Precisely because it's too easy, it should alarm you more.\n\n### A necessary cold shower: 100% is not always good\nInsiders get wary at \"100% accuracy\" — it often hints the data is too clean, or the feature sits unnaturally close to the answer (possible information leakage or oversimplification). Real mushrooms aren't so obedient: some varieties are \"conditionally edible\" (safe if handled right, toxic if not), some poisonous ones don't smell pungent, and there are \"look-alike\" species nearly identical to safe ones (e.g., the deadly Amanita and the harmless straw mushroom look almost the same, fooling even experts).\n\nSo this dataset's 100 points hold \"within the rules of this particular dataset,\" not \"in the forest.\" Treating it as a mushroom manual is a joke with your life — every year people poison themselves by \"trusting experience / some app\" to forage; officials repeatedly warn against eating wild mushrooms. A perfect score here is classroom luck, not a forest lifesaver; no emphasis is too much, because it is life and death.\n\n### Why should ordinary people care?\nIt explains the value of \"interpretable models\" most intuitively: a decision tree can print rules like \"if odor is pungent, judge poisonous\" in plain language — a hundred times easier to grasp than a black box. For ordinary people it is a great lesson in \"how features decide judgments\" — you'll see AI isn't always mysticism; sometimes it's a readable chain of if-thens. You'll also learn: the easier to explain and the fuller the score, the more you should ask \"does this score rely on real skill or just obedient data?\" That skeptical spirit matters more than memorizing conclusions, and helps you spot those \"AI recognition\" products boasting miracles, like the \"photo-identify mushroom\" mini-apps in friend circles.\n\n### Real-world connection\nIn real mycology, judging toxicity needs microscopes, chemical composition, molecular evidence — never guessing by smell. This data, collected in 1981, has a taxonomy that has since evolved; the \"edible/poisonous\" labels of then may not all hold today. It belongs in the classroom to teach models, not in the forest as a guide — conflating a classroom model with a life-death decision is the most dangerous example of data misuse, and the very thing this article most wants to stop: don't let a classroom exercise become the bite you swallow.\n\n### Common misconceptions\n1: the model is 100% so I can be 100% right — you aren't the model; you lack those 22 precise labels, and eyes are far less reliable. 2: no odor = safe — true in the data, not necessarily in the forest; the Amanita is the counterexample. 3: in the digital age an app can recognize it — no general recognition is remotely reliable yet; don't verify with your life. 4: perfect score = perfect model — a perfect score is often a signal the data is too obedient; check why, don't rush to applaud. Those who applaud rush are the ones most likely to trip in the real world.\n\n### Honest limitations\nFirst, only morphology and habitat descriptions, no molecular-level toxicity evidence. Second, the data is old and the classification system has changed. Third, the edible/poisonous split hides gray zones like \"conditionally edible\"; reality is more complex than black-and-white. The most critical line: do NOT forage based on it; if you really want to eat, trust a professional guide or expert. This red line is harder than any analysis conclusion — please pass it to friends who love to taste new things.\n\n### Why a \"white box\" is more valuable than a \"black box\"\nThe biggest gift of this data is letting you see how the model thinks. Many modern AIs are black boxes — they give an answer but can't say why, hard to hold accountable when wrong. The mushroom data, with a decision tree, proves a transparent model is not only trustworthy but also easy to debug and regulate. In life-and-death fields like medicine and justice, being explainable is often worth more than a tiny accuracy gain — which is why regulation increasingly demands AI \"speak human.\"\n\n### The data's age\nCollected in 1981, its species naming and taxonomy have since changed. It teaches models, yes, but to truly identify mushrooms you need today's science. The same applies to all old datasets: applying a decade-old pattern to today's world drifts. Before using data, check its \"birth date\" — a habit that avoids many outdated conclusions, and reminds us knowledge ages and needs updating.\n\n### A life-saving rule\nWrite this in your phone memo: wild mushrooms — if you don't recognize it, don't pick, buy, or eat it. Any \"photo-recognition app says edible\" is untrustworthy, because the data tells us a perfect-score model only learned the few samples it saw; the forest holds far more unknowns than the data. If you really want to eat, buy farmed ones at a proper supermarket — that's the steadiest lifesaver in the data age. Don't verify algorithms with your life, and don't trade a classroom exercise for a dinner.\n\n### Summary\nThe mushroom data, with 8,124 records, proves: the odor feature is strong enough to nearly perfect the model, and decision trees become especially easy to understand because of it. But the lesson to remember most is — a 100 in the data cannot translate to a lifesaver in the wild. It is a model of interpretable machine learning, not a mushroom manual. Read it and you'll understand \"behind a high score, ask: is this score trustworthy,\" and gain a concept of \"AI interpretability\": being explainable is the premise of trust, but explaining correctly also requires that it learned the real world — both gates are indispensable, and when facing a bowl of mushroom soup, beyond those two gates there is a gate of life."
  },
  "uciml/pima-indians-diabetes-database": {
    "title": "Pima Indians Diabetes (EN)",
    "desc": "A subset from the U.S. National Institute of Diabetes, Digestive and Kidney Diseases (NIDDK): 768 Pima Indian women aged 21+ with clinical measurements; the goal is binary classification of diabetes onset within 5 years. This group has a high Type-2 diabetes rate, making it a classic sample for studying how multiple risk factors interact.",
    "cols": [
      {
        "n": "Pregnancies",
        "t": "int",
        "r": "feature",
        "d": "number of pregnancies"
      },
      {
        "n": "Glucose",
        "t": "float",
        "r": "feature",
        "d": "2-hour plasma glucose after oral glucose tolerance test"
      },
      {
        "n": "BloodPressure",
        "t": "int",
        "r": "feature",
        "d": "diastolic blood pressure (mm Hg)"
      },
      {
        "n": "SkinThickness",
        "t": "int",
        "r": "feature",
        "d": "triceps skin fold thickness (mm)"
      },
      {
        "n": "Insulin",
        "t": "int",
        "r": "feature",
        "d": "2-hour serum insulin (uU/ml)"
      },
      {
        "n": "BMI",
        "t": "float",
        "r": "feature",
        "d": "body mass index (kg/m2)"
      },
      {
        "n": "DiabetesPedigreeFunction",
        "t": "float",
        "r": "feature",
        "d": "diabetes pedigree function (genetic predisposition)"
      },
      {
        "n": "Age",
        "t": "int",
        "r": "feature",
        "d": "age (years)"
      },
      {
        "n": "Outcome",
        "t": "int",
        "r": "target",
        "d": "0 = no diabetes / 1 = diabetes"
      }
    ],
    "target": "Outcome (binary; ~34.9% positive class)",
    "quality": [
      "768 rows x 9 cols",
      "WARNING: missing encoded as 0 - 0 in Glucose/BMI/SkinThickness/Insulin actually means missing and must be identified and imputed first (classic trap)",
      "Slight class imbalance (positive ~268/768)"
    ],
    "tasks": [
      "Binary classification (diabetes risk)"
    ],
    "models": [
      "Baseline: logistic regression + cross-validation (handle 0-value missingness)",
      "Advanced: random forest / gradient boosting with feature-importance ranking",
      "Always detect missing (e.g., Glucose==0 flagged) before modeling"
    ],
    "limits": [
      "Female-only, single indigenous group - limited external generalization",
      "0-as-missing encoding misleads models if ignored",
      "No time dimension or medication records - causal inference hard"
    ],
    "source": "UCI Machine Learning Repository (original owner NIDDK)",
    "license": "CC0 (public domain)",
    "results": [
      "After correctly flagging 0-valued glucose/BMI etc. as missing and imputing, random forest reaches ~75-82% accuracy, ~78% recall, AUC ~0.85-0.88; logistic regression slightly lower (~70-78%).",
      "Glucose is the strongest predictor (~28.5% importance), then BMI (~19.8%), Age (~16.5%) - consistent with clinical knowledge.",
      "Ignoring 0-as-missing severely misleads models; SMOTE / class weights improve minority recall.",
      "Conclusion: blood glucose + BMI are core risk signals, but the sample is only 768 women from one group - limited external generalization."
    ],
    "cite": "Smith, J.W., Everhart, J.E., Dickson, W.C., Knowler, W.C., & Johannes, R.S. (1988). Using the ADAP learning algorithm to forecast the onset of diabetes mellitus.",
    "writeup": "**One-line takeaway**: This dataset is a textbook lesson in a silent trap - the number 0, which looks like nothing, is actually missing here; miss it and your model lies.\n\n### What is it really about?\n768 Pima Indian women (aged 21+) with eight clinical measurements - pregnancies, glucose, blood pressure, skin thickness, insulin, BMI, a diabetes pedigree function, and age. The target is whether diabetes was diagnosed within five years (binary). It is a staple for studying how multiple risk factors combine.\n\n### The 0-valued trap\nThe original data uses 0 to encode missing values in Glucose, BMI, SkinThickness, and Insulin. A naive model treats 0 as a real number and learns nonsense - for example, zero glucose as a healthy signal. The correct first step is to flag 0s as missing and impute them. This single fix is the difference between a useless model and a usable one.\n\n### Key findings\nAfter proper missing-value handling, a random forest reaches about 75-82% accuracy, ~78% recall, and AUC ~0.85-0.88; logistic regression lands slightly lower (~70-78%). Glucose is by far the strongest predictor (~28.5% importance), followed by BMI (~19.8%) and Age (~16.5%) - exactly what clinicians expect. SMOTE or class weights help the minority (diabetes) class.\n\n### Honest limitations\nThe sample is female-only from one indigenous group, so it does not represent the general population. There is no time dimension or medication history, so causal claims are out of reach. And the 0-as-missing encoding, if ignored, quietly corrupts everything.\n\n### Why ordinary people should care\nIt teaches a universal data lesson: missing data is rarely marked missing - it hides as zeros, sentinels, or blanks. Before trusting any model, ask how missingness was handled. A model's score is only as honest as its preprocessing."
  },
  "rajyellow46/wine-quality": {
    "title": "Wine Quality (EN)",
    "desc": "Cortez et al. (2009) built this from Portuguese Vinho Verde red and white wines: 11 physicochemical tests plus a sensory quality score (0-10) by expert tasters. Red: 1,599 rows; white: 4,898 rows. A standard regression / ordinal-classification benchmark.",
    "cols": [
      {
        "n": "fixed acidity",
        "t": "float",
        "r": "feature",
        "d": "fixed acidity"
      },
      {
        "n": "volatile acidity",
        "t": "float",
        "r": "feature",
        "d": "volatile acidity"
      },
      {
        "n": "citric acid",
        "t": "float",
        "r": "feature",
        "d": "citric acid"
      },
      {
        "n": "residual sugar",
        "t": "float",
        "r": "feature",
        "d": "residual sugar"
      },
      {
        "n": "chlorides",
        "t": "float",
        "r": "feature",
        "d": "chlorides"
      },
      {
        "n": "free sulfur dioxide",
        "t": "float",
        "r": "feature",
        "d": "free sulfur dioxide"
      },
      {
        "n": "total sulfur dioxide",
        "t": "float",
        "r": "feature",
        "d": "total sulfur dioxide"
      },
      {
        "n": "density",
        "t": "float",
        "r": "feature",
        "d": "density"
      },
      {
        "n": "pH",
        "t": "float",
        "r": "feature",
        "d": "pH"
      },
      {
        "n": "sulphates",
        "t": "float",
        "r": "feature",
        "d": "sulphates"
      },
      {
        "n": "alcohol",
        "t": "float",
        "r": "feature",
        "d": "alcohol (% vol)"
      },
      {
        "n": "quality",
        "t": "int",
        "r": "target",
        "d": "sensory score 0-10 (median of >=3 experts)"
      }
    ],
    "target": "quality (ordinal integer 0-10; can be binarized as good/bad)",
    "quality": [
      "White 4898 + red 1599 rows x 12 cols, no missing values",
      "Ordinal and highly imbalanced classes (most wines are average; extreme good/bad are rare)",
      "Original conclusion: not all inputs are relevant; feature selection matters"
    ],
    "tasks": [
      "Regression (predict score)",
      "Ordinal classification / binary (quality>=7 is good)"
    ],
    "models": [
      "Original best: SVM (regression)",
      "Baseline: linear / ridge regression, random forest; binary via logistic regression",
      "Adjust threshold or resample for the imbalance"
    ],
    "limits": [
      "Only physicochemical + sensory variables; no grape variety, brand, or price context",
      "Score is the subjective median of a few experts, with inherent noise",
      "Model red and white separately; geography limited to northwest Portugal"
    ],
    "source": "UCI Machine Learning Repository",
    "license": "CC BY 4.0",
    "results": [
      "Cortez et al.: not all physicochemical variables are relevant; alcohol correlates most positively with quality, volatile acidity most negatively.",
      "SVM is optimal for regression; most scores are 5-6, so ordinal classification must handle imbalance.",
      "Red and white should be modeled separately: whites are ~3x the red sample and drivers differ slightly.",
      "Interpretable view: higher alcohol and lower volatile acidity tend to earn higher scores."
    ],
    "cite": "Cortez, P., Cerdeira, A., Almeida, F., Matos, T., & Reis, J. (2009). Modeling wine preferences by data mining from physicochemical properties. Decision Support Systems, 47(4), 547-553.",
    "writeup": "**One-line takeaway**: Wine quality is driven less by mystery than by two boring numbers - alcohol and volatile acidity - and most bottles cluster in the mediocre middle.\n\n### What is it really about?\nCortez et al. (2009) built this from Portuguese Vinho Verde wines: 4,898 white and 1,599 red, each described by 11 physicochemical tests (acidity, sugar, chlorides, sulfur dioxide, density, pH, sulphates, alcohol) plus a sensory quality score from 0-10 by expert tasters. It is a standard regression / ordinal-classification benchmark.\n\n### What actually predicts quality\nThe paper's clear conclusion: not all inputs matter. Alcohol shows the strongest positive correlation with score; volatile acidity (think vinegar-like sharpness) the strongest negative. In plain terms, higher alcohol and lower sharp acidity tend to earn higher marks. White and red should be modeled separately; whites outnumber reds about 3-to-1 and their drivers differ slightly.\n\n### The imbalance problem\nMost wines score 5-6; extreme good or bad bottles are rare. That makes ordinal classification awkward - a model that always predicts average looks decent by accuracy but is useless. Threshold tuning or resampling is needed.\n\n### Honest limitations\nOnly physicochemical and sensory variables are present - no grape variety, brand, price, or vintage context. The score is the subjective median of a few tasters, carrying inherent noise. Geography is limited to northwest Portugal.\n\n### Why it matters\nIt is a clean demonstration that feature selection matters: throwing all variables at a model is worse than keeping the few that truly move the needle. For drinkers, the takeaway is humble - the expert score leans heavily on measurable chemistry, not mysticism."
  },
  "fedesoriano/stroke-prediction-dataset": {
    "title": "Stroke Prediction (EN)",
    "desc": "A clinical dataset collected by fedesoriano: 5,110 patients with 11 demographic, lifestyle, and medical-history features; the target is whether a stroke occurred (binary). Per the WHO, stroke is the world's 2nd leading cause of death, so early high-risk identification matters.",
    "cols": [
      {
        "n": "id",
        "t": "int",
        "r": "identifier",
        "d": "unique id (drop before modeling)"
      },
      {
        "n": "gender",
        "t": "category",
        "r": "feature",
        "d": "Male/Female/Other (Other only 1 row)"
      },
      {
        "n": "age",
        "t": "float",
        "r": "feature",
        "d": "age"
      },
      {
        "n": "hypertension",
        "t": "int",
        "r": "feature",
        "d": "0/1 hypertension"
      },
      {
        "n": "heart_disease",
        "t": "int",
        "r": "feature",
        "d": "0/1 heart disease"
      },
      {
        "n": "ever_married",
        "t": "category",
        "r": "feature",
        "d": "No/Yes"
      },
      {
        "n": "work_type",
        "t": "category",
        "r": "feature",
        "d": "children/Govt_job/Private/..."
      },
      {
        "n": "Residence_type",
        "t": "category",
        "r": "feature",
        "d": "Rural/Urban"
      },
      {
        "n": "avg_glucose_level",
        "t": "float",
        "r": "feature",
        "d": "average glucose level"
      },
      {
        "n": "bmi",
        "t": "float",
        "r": "feature",
        "d": "body mass index (201 missing)"
      },
      {
        "n": "smoking_status",
        "t": "category",
        "r": "feature",
        "d": "formerly/never/smokes/Unknown"
      },
      {
        "n": "stroke",
        "t": "int",
        "r": "target",
        "d": "0/1 stroke"
      }
    ],
    "target": "stroke (binary; only 4.9% positive - severe imbalance)",
    "quality": [
      "5110 rows x 12 cols (incl. id)",
      "WARNING: severe class imbalance - only 249 strokes (4.9%); naive accuracy ~95% is clinically useless",
      "bmi missing for 201 rows; smoking_status heavily Unknown",
      "gender Other only 1 row, usually dropped"
    ],
    "tasks": [
      "Binary classification (highly imbalanced)",
      "Risk ranking"
    ],
    "models": [
      "Evaluate with Recall / F1 / PR-AUC, never raw accuracy",
      "Imbalance handling: SMOTE, downsampling, class weights; tree models (XGBoost) work well",
      "Logistic regression needs probability calibration; use for risk ranking, not diagnosis"
    ],
    "limits": [
      "Extreme imbalance makes accuracy deeply misleading",
      "smoking_status Unknown is common, so smoking conclusions are shaky",
      "Not a diagnostic tool; gender fairness (bias) is a serious concern",
      "Single source, no follow-up window - survival analysis is hard"
    ],
    "source": "Kaggle (fedesoriano)",
    "license": "CC0",
    "results": [
      "Naive accuracy can reach ~95% yet is clinically useless (only 4.9% had strokes); must look at Recall / F1 / PR-AUC.",
      "SMOTE or class weights + tree models (XGBoost / LightGBM) substantially lift positive recall; logistic regression needs calibration.",
      "Realistic reproductions: after imbalance handling F1 ~0.4-0.6 (limited by extreme imbalance and missingness) - showing high accuracy != good screening.",
      "Age, average glucose, BMI, and heart-disease history usually rank highest for risk sorting."
    ],
    "cite": "Dataset by Fede Soriano (Kaggle, 2021). Reference: WHO stroke statistics; many Kaggle/research reproductions emphasize Recall-first and SMOTE.",
    "writeup": "**One-line takeaway**: Here a 95% accurate model is clinically worthless - because only 4.9% of patients actually had a stroke. Accuracy lies; recall and PR-AUC tell the truth.\n\n### What is it really about?\n5,110 patients with 11 demographic, lifestyle, and medical-history features; the target is whether a stroke occurred (binary). Per the WHO, stroke is the world's 2nd leading cause of death, so early high-risk identification matters.\n\n### The imbalance trap\nOnly 249 of 5,110 patients (4.9%) had a stroke. A lazy model that predicts no stroke for everyone scores ~95% accuracy - and would miss every single stroke patient. This is the canonical example of why raw accuracy is dangerous on imbalanced medical data.\n\n### What works\nEvaluation must use recall, F1, and PR-AUC, never plain accuracy. Handling imbalance (SMOTE, downsampling, class weights) with tree models (XGBoost / LightGBM) lifts positive-class recall substantially; logistic regression needs probability calibration. Age, average glucose, BMI, and heart-disease history typically rank highest for risk sorting.\n\n### Honest limitations\nUnknown dominates smoking_status, so smoking-related conclusions are shaky. It is not a diagnostic tool, and gender fairness (bias) is a serious concern. Single-source, no follow-up window - survival analysis is hard.\n\n### Why ordinary people should care\nIt is the clearest possible lesson that a big accuracy number can be a smokescreen. When a health AI claims 95% accurate, ask what it actually catches. A screening tool's job is to find the rare positive, not to look impressive on paper."
  },
  "clmentbisaillon/fake-and-real-news-dataset": {
    "title": "Fake and Real News (EN)",
    "desc": "11,506 English news items (6,335 fake, 5,171 real) with title, body, subject, and date; the task is binary fake/real classification. A standard NLP benchmark for rumor / fake-news detection.",
    "cols": [
      {
        "n": "title",
        "t": "text",
        "r": "feature",
        "d": "news title"
      },
      {
        "n": "text",
        "t": "text",
        "r": "feature",
        "d": "news body"
      },
      {
        "n": "subject",
        "t": "category",
        "r": "feature",
        "d": "subject category"
      },
      {
        "n": "date",
        "t": "date",
        "r": "feature",
        "d": "publish date"
      },
      {
        "n": "label",
        "t": "category",
        "r": "target",
        "d": "FAKE / REAL"
      }
    ],
    "target": "label (FAKE/REAL binary)",
    "quality": [
      "~11506 rows x 5 cols, roughly balanced (6335 fake / 5171 real)",
      "English corpus; body length varies widely",
      "Limited subjects, distribution-shift risk"
    ],
    "tasks": [
      "Text binary classification (fake-news detection)",
      "Subject classification"
    ],
    "models": [
      "Baseline: TF-IDF + logistic regression / naive Bayes / linear SVM",
      "Advanced: LSTM, Transformer (BERT-class) fine-tuning",
      "Beware leakage from date/subject vs label; strict splitting"
    ],
    "limits": [
      "English-only, poor cross-language generalization",
      "Sources skew political, off from real-world distribution",
      "Time-sensitive; old models drift; possible stance bias"
    ],
    "source": "Kaggle (clmentbisaillon)",
    "license": "CC0",
    "results": [
      "TF-IDF + logistic regression / naive Bayes already exceed 90% accuracy; BERT-class transformers add a modest lift.",
      "subject / date correlate with label and can leak; strict temporal splitting is required.",
      "Conclusion: fake news has stable patterns in wording, emotion words, and specific subjects, but cross-topic / cross-language generalization is weak."
    ],
    "cite": "Kaggle Fake and Real News Dataset (clmentbisaillon).",
    "writeup": "**One-line takeaway**: Fake-news detection is easy on this dataset and misleading in the real world - because the data is narrow, English-only, and politically skewed.\n\n### What is it really about?\n11,506 English news items (6,335 fake, 5,171 real) with title, body, subject, and date; the task is binary fake/real classification. A standard NLP benchmark.\n\n### What works\nSimple baselines shine: TF-IDF + logistic regression or naive Bayes already exceed 90% accuracy; BERT-style transformers add a modest further lift. The text carries stable patterns - emotionally loaded words, certain subjects, distinctive phrasing.\n\n### The leakage trap\nsubject and date correlate with label and can leak if you split randomly. Strict temporal splitting is required, otherwise your great model is cheating.\n\n### Honest limitations\nEnglish-only, so cross-language generalization is poor. Sources skew toward politics, so the real-world distribution is off. News ages fast - models drift as language and events move; stance bias is a real risk.\n\n### Why it matters\nIt shows both the promise and the trap of text classification: a high score here does not mean a reliable detector in the wild. Distribution shift and concept drift are the enemies. For readers, the lesson is that AI detects fake news is far from solved - context, language, and time all break the simple pattern."
  },
  "rdoume/beerreviews": {
    "title": "Beer Reviews (EN)",
    "desc": "About 1.5 million beer reviews with brewery, style, ABV, and multi-dimensional user ratings (overall, aroma, appearance, palate, taste) plus free-text comments. A large corpus for recommendation, rating prediction, and sentiment analysis.",
    "cols": [
      {
        "n": "brewery_id",
        "t": "int",
        "r": "identifier",
        "d": "brewery id"
      },
      {
        "n": "brewery_name",
        "t": "text",
        "r": "feature",
        "d": "brewery name"
      },
      {
        "n": "review_overall",
        "t": "float",
        "r": "feature",
        "d": "overall rating (core)"
      },
      {
        "n": "review_aroma",
        "t": "float",
        "r": "feature",
        "d": "aroma rating"
      },
      {
        "n": "review_appearance",
        "t": "float",
        "r": "feature",
        "d": "appearance rating"
      },
      {
        "n": "review_palette",
        "t": "float",
        "r": "feature",
        "d": "palate rating"
      },
      {
        "n": "review_taste",
        "t": "float",
        "r": "feature",
        "d": "taste rating"
      },
      {
        "n": "beer_style",
        "t": "category",
        "r": "feature",
        "d": "beer style"
      },
      {
        "n": "beer_name",
        "t": "text",
        "r": "feature",
        "d": "beer name"
      },
      {
        "n": "beer_abv",
        "t": "float",
        "r": "feature",
        "d": "alcohol by volume (%)"
      },
      {
        "n": "review_profilename",
        "t": "text",
        "r": "feature",
        "d": "reviewer username (PII)"
      },
      {
        "n": "review_text",
        "t": "text",
        "r": "feature",
        "d": "free-text comment"
      }
    ],
    "target": "review_overall (regression) or style / recommendation",
    "quality": [
      "~1.5M rows x 13 cols, single file ~180MB (largest dataset)",
      "review_text is long; users/beers repeat",
      "Contains user-generated content (PII) such as usernames"
    ],
    "tasks": [
      "Rating regression",
      "Beer/user recommendation",
      "Review-text sentiment analysis"
    ],
    "models": [
      "Rating prediction: gradient boosting (XGBoost/LightGBM); ABV correlates with rating",
      "NLP: topic / sentiment modeling on review_text",
      "Recommendation: collaborative filtering on user-beer interactions"
    ],
    "limits": [
      "180MB large file; sample locally on demand",
      "Reviewers are not random (selection bias); ratings right-skewed",
      "Contains username PII - anonymize before public display; noisy text"
    ],
    "source": "Kaggle (rdoume)",
    "license": "CC0",
    "results": [
      "review_overall correlates strongly with review_taste / aroma; beer_abv correlates moderately.",
      "Gradient boosting (XGBoost / LightGBM) rating prediction R2 ~0.6-0.7; user-beer interactions enable collaborative-filtering recommenders.",
      "Review text supports topic / sentiment modeling, but username PII must be anonymized and text is noisy.",
      "Selection bias (reviewers not random) and right-skewed ratings are present."
    ],
    "cite": "Kaggle Beer Reviews Dataset (rdoume).",
    "writeup": "**One-line takeaway**: 1.5 million beer reviews are a recommender's playground - but at 180MB with user names attached, it demands sampling and privacy care.\n\n### What is it really about?\n~1.5M beer reviews with brewery, style, ABV, and multi-dimensional user ratings (overall, aroma, appearance, palate, taste) plus free-text comments. A large corpus for recommendation, rating prediction, and sentiment analysis.\n\n### What works\nreview_overall correlates strongly with taste and aroma; ABV correlates moderately. Gradient boosting (XGBoost / LightGBM) for rating prediction reaches R2 ~0.6-0.7; user-beer interactions feed collaborative-filtering recommenders. The free text supports topic / sentiment modeling.\n\n### Honest limitations\nThe 180MB file needs on-demand sampling. Reviewers are not random (selection bias), and ratings are right-skewed. It contains user names (PII) - any public display must be anonymized, and the text is noisy.\n\n### Why it matters\nIt is a realistic large-scale recsys dataset: you learn that interaction data, not just item features, drives good recommendations, and that scale brings engineering (sampling, PII) as well as modeling challenges."
  },
  "adityakadiwal/water-potability": {
    "title": "Water Potability (EN)",
    "desc": "3,276 water samples with 9 physicochemical indicators (pH, hardness, dissolved solids, chloramines, sulfate, conductivity, organic carbon, trihalomethanes, turbidity); the target is a binary potable / not label. Used for environmental monitoring and public-health modeling.",
    "cols": [
      {
        "n": "ph",
        "t": "float",
        "r": "feature",
        "d": "pH (has missing)"
      },
      {
        "n": "Hardness",
        "t": "float",
        "r": "feature",
        "d": "hardness"
      },
      {
        "n": "Solids",
        "t": "float",
        "r": "feature",
        "d": "total dissolved solids"
      },
      {
        "n": "Chloramines",
        "t": "float",
        "r": "feature",
        "d": "chloramines"
      },
      {
        "n": "Sulfate",
        "t": "float",
        "r": "feature",
        "d": "sulfate (has missing)"
      },
      {
        "n": "Conductivity",
        "t": "float",
        "r": "feature",
        "d": "conductivity"
      },
      {
        "n": "Organic_carbon",
        "t": "float",
        "r": "feature",
        "d": "organic carbon"
      },
      {
        "n": "Trihalomethanes",
        "t": "float",
        "r": "feature",
        "d": "trihalomethanes (has missing)"
      },
      {
        "n": "Turbidity",
        "t": "float",
        "r": "feature",
        "d": "turbidity"
      },
      {
        "n": "Potability",
        "t": "int",
        "r": "target",
        "d": "0/1 potable"
      }
    ],
    "target": "Potability (binary; ~39% positive)",
    "quality": [
      "3276 rows x 10 cols",
      "WARNING: multiple missing - ph / Sulfate / Trihalomethanes need imputation",
      "Slight class imbalance (~39% positive)"
    ],
    "tasks": [
      "Binary classification (potability)",
      "Missing-value study"
    ],
    "models": [
      "Impute missing (mean / model-based) before modeling",
      "Baseline: logistic regression / gradient boosting + calibration",
      "Watch feature correlations (e.g., Solids with Conductivity)"
    ],
    "limits": [
      "Potable is a policy threshold, not a continuous safety measure",
      "Sampling region unknown - geographic generalization limited",
      "Non-trivial missing proportion; imputation assumptions shape conclusions"
    ],
    "source": "Kaggle (adityakadiwal)",
    "license": "CC0",
    "results": [
      "After imputation, logistic regression / gradient boosting reach only ~60-65% accuracy - barely above the class baseline (since potability is a policy threshold with weak signal).",
      "Features correlate (e.g., Solids with Conductivity), so single-variable separation is limited.",
      "Conclusion: potability is a thresholded label; the model mostly captures sampling bias, not a universal safety law.",
      "ph, Trihalomethanes, Sulfate have notable missing proportions; imputation assumptions strongly affect conclusions."
    ],
    "cite": "Kaggle Water Potability Dataset.",
    "writeup": "**One-line takeaway**: Potable is a policy threshold, not a physical measurement - so models here mostly learn sampling bias, not universal safety.\n\n### What is it really about?\n3,276 water samples with 9 physicochemical indicators (pH, hardness, dissolved solids, chloramines, sulfate, conductivity, organic carbon, trihalomethanes, turbidity); the target is a binary potable / not label.\n\n### The missing-data wrinkle\npH, Sulfate, and Trihalomethanes have substantial missing values that must be imputed first. After imputation, logistic regression / gradient boosting reach only ~60-65% accuracy - barely above the class baseline (~39% positive).\n\n### Why the signal is weak\nPotability is defined by a threshold on test results, not a continuous safety measure. Features correlate (e.g., Solids with Conductivity), so single-variable separation is limited. The model mostly captures where samples were drawn, not a general safety law.\n\n### Honest limitations\nSampling region is unknown (geographic generalization limited). Missing proportions are non-trivial, so imputation assumptions heavily shape conclusions.\n\n### Why it matters\nIt is a cautionary tale: a label that looks like ground truth may actually be a man-made cutoff. Always ask what a target variable really measures before trusting a model built on it."
  },
  "nehalbirla/vehicle-dataset-from-cardekho": {
    "title": "Vehicle (cardekho) (EN)",
    "desc": "3,017 used cars from cardekho with 13 features (name, year, selling price, present price, kilometers driven, fuel type, seller type, transmission, owner, plus parsed mileage/engine/power/seats); the target is Selling_Price (regression). A typical business regression task.",
    "cols": [
      {
        "n": "Name",
        "t": "text",
        "r": "feature",
        "d": "model name (high cardinality; needs feature engineering)"
      },
      {
        "n": "Year",
        "t": "int",
        "r": "feature",
        "d": "registration year"
      },
      {
        "n": "Selling_Price",
        "t": "float",
        "r": "target",
        "d": "seller quote (100k INR)"
      },
      {
        "n": "Present_Price",
        "t": "float",
        "r": "feature",
        "d": "current showroom price"
      },
      {
        "n": "Kms_Driven",
        "t": "int",
        "r": "feature",
        "d": "kilometers driven"
      },
      {
        "n": "Fuel_Type",
        "t": "category",
        "r": "feature",
        "d": "fuel type"
      },
      {
        "n": "Seller_Type",
        "t": "category",
        "r": "feature",
        "d": "individual / dealer"
      },
      {
        "n": "Transmission",
        "t": "category",
        "r": "feature",
        "d": "manual / automatic"
      },
      {
        "n": "Owner",
        "t": "int",
        "r": "feature",
        "d": "number of previous owners"
      },
      {
        "n": "Mileage / Engine / Power / Seats",
        "t": "mixed",
        "r": "feature",
        "d": "mileage/engine/power/seats (parsed from strings)"
      }
    ],
    "target": "Selling_Price (regression)",
    "quality": [
      "3017 rows x 13 cols, basically no missing",
      "Selling_Price continuous; Name high cardinality (model)",
      "Mixed string fields (Mileage with 'kmpl' etc.) need parsing"
    ],
    "tasks": [
      "Regression (used-car price)"
    ],
    "models": [
      "Baseline: random forest / XGBoost (handles mixed types)",
      "Feature engineering: extract brand from Name; parse Mileage/Power numerics",
      "Year and Kms_Driven are main drivers"
    ],
    "limits": [
      "India-specific market; exchange rates / models do not transfer",
      "Name redundant and high cardinality; encode carefully to avoid overfitting",
      "Price affected by condition, region, and unrecorded factors"
    ],
    "source": "Kaggle (nehalbirla)",
    "license": "CC0",
    "results": [
      "Random forest / XGBoost regression on Selling_Price commonly reach R2 ~0.80-0.90; Present_Price, Year, Kms_Driven are main drivers.",
      "Name high cardinality needs brand / model extraction and careful encoding, or it overfits.",
      "India-specific market; exchange rates / models do not transfer; condition and region live in the residual.",
      "Conclusion: vehicle age and mileage are the strongest depreciation signals, brand premium second."
    ],
    "cite": "Kaggle Vehicle Dataset from cardekho.",
    "writeup": "**One-line takeaway**: Used-car price is mostly explained by age and mileage - and the flashy model name is the feature most likely to cause overfitting.\n\n### What is it really about?\n3,017 used cars from cardekho with 13 features (name, year, selling price, present price, kilometers driven, fuel type, seller type, transmission, owner, plus parsed mileage/engine/power/seats); the target is Selling_Price (regression).\n\n### What works\nRandom forest / XGBoost reach R2 ~0.80-0.90. Present_Price, Year, and Kms_Driven are the main drivers. Feature engineering matters: extract brand/model from the high-cardinality Name, and parse numeric values out of strings like Mileage: 20 kmpl.\n\n### The overfitting trap\nName is high-cardinality (thousands of model strings). Encode it carelessly and the model memorizes instead of learning. Extract brand and treat the rest with care.\n\n### Honest limitations\nIndia-specific market; exchange rates and models do not transfer. Unrecorded factors - condition, region, accidents - live in the residual. So the model prices the average car, not your car.\n\n### Why it matters\nA tidy business-regression example: a few well-understood drivers beat a pile of raw text, and careful feature engineering beats brute-force encoding. For sellers, the takeaway is blunt - age and miles are what erode value, brand premium second."
  },
  "andrewmvd/heart-failure-clinical-data": {
    "title": "Heart Failure Clinical (EN)",
    "desc": "299 heart-failure patients with 13 clinical indicators (age, ejection fraction, serum creatinine, etc.); the target is death during follow-up (binary). Built for medical risk modeling and interpretability analysis.",
    "cols": [
      {
        "n": "age",
        "t": "int",
        "r": "feature",
        "d": "age"
      },
      {
        "n": "anaemia",
        "t": "int",
        "r": "feature",
        "d": "0/1 anaemia"
      },
      {
        "n": "creatinine_phosphokinase",
        "t": "int",
        "r": "feature",
        "d": "CPK enzyme (mcg/L)"
      },
      {
        "n": "diabetes",
        "t": "int",
        "r": "feature",
        "d": "0/1 diabetes"
      },
      {
        "n": "ejection_fraction",
        "t": "int",
        "r": "feature",
        "d": "ejection fraction (%)"
      },
      {
        "n": "high_blood_pressure",
        "t": "int",
        "r": "feature",
        "d": "0/1 hypertension"
      },
      {
        "n": "platelets",
        "t": "float",
        "r": "feature",
        "d": "platelets"
      },
      {
        "n": "serum_creatinine",
        "t": "float",
        "r": "feature",
        "d": "serum creatinine"
      },
      {
        "n": "serum_sodium",
        "t": "float",
        "r": "feature",
        "d": "serum sodium"
      },
      {
        "n": "sex",
        "t": "int",
        "r": "feature",
        "d": "sex"
      },
      {
        "n": "smoking",
        "t": "int",
        "r": "feature",
        "d": "0/1 smoking"
      },
      {
        "n": "time",
        "t": "int",
        "r": "feature",
        "d": "follow-up days"
      },
      {
        "n": "DEATH_EVENT",
        "t": "int",
        "r": "target",
        "d": "0/1 death in follow-up"
      }
    ],
    "target": "DEATH_EVENT (binary; ~32% positive)",
    "quality": [
      "299 rows x 13 cols, no missing",
      "Small sample; class imbalance (~32% death events)",
      "Has time field; can extend to survival analysis"
    ],
    "tasks": [
      "Binary classification (death event)",
      "Survival analysis (optional)"
    ],
    "models": [
      "Baseline: logistic regression / LightGBM + cross-validation (prevent overfit on small sample)",
      "Interpretable: SHAP for risk-factor ranking",
      "Small sample - prefer simple models and regularization"
    ],
    "limits": [
      "Single-center small sample (299); external validation necessary",
      "Few death events; high estimation variance",
      "Decision-support only, not a substitute for clinical judgment"
    ],
    "source": "Kaggle (andrewmvd)",
    "license": "CC0",
    "results": [
      "On this 299-patient sample, logistic regression / RF / XGBoost commonly reach death-event AUC ~0.80-0.90 and accuracy ~0.85; cross-validation prevents overfitting.",
      "Strongest predictors are usually ejection fraction, serum creatinine, serum sodium, and age; SHAP gives individual risk explanations.",
      "Small sample, few events (~32%), high variance; external single-center validation necessary.",
      "Decision-support only, not a substitute for clinical judgment; the time field invites survival analysis."
    ],
    "cite": "Davoodi, A. et al. (related to UCI Heart Failure Clinical Records).",
    "writeup": "**One-line takeaway**: With only 299 patients, this dataset proves that a small, clean clinical sample can still yield a useful risk model - if you respect the variance.\n\n### What is it really about?\n299 heart-failure patients with 13 clinical indicators (age, anaemia, CPK enzyme, diabetes, ejection fraction, blood pressure, platelets, serum creatinine, serum sodium, sex, smoking, follow-up time, death event). Target: death during follow-up (binary). Built for medical risk modeling and interpretability.\n\n### What works\nLogistic regression / RF / XGBoost typically reach AUC ~0.80-0.90 and accuracy ~0.85; cross-validation guards against overfitting on the small sample. The strongest predictors are usually ejection fraction, serum creatinine, serum sodium, and age; SHAP can explain individual risk.\n\n### Honest limitations\nSingle-center, small sample (299), with only ~32% events - estimates carry high variance, so external validation is essential. It is decision-support only, never a substitute for clinical judgment. The time field invites survival analysis.\n\n### Why it matters\nIt is a model of responsible medical ML: prefer simple, regularized, explainable models when data is scarce, report uncertainty honestly, and keep the clinician in the loop. A 0.85 accuracy on 299 patients is encouraging - but the confidence interval, not the point estimate, is what a doctor should see."
  },
  "venky73/spam-mails-dataset": {
    "title": "Spam Mails (EN)",
    "desc": "5,572 emails labeled spam or ham with the message body; the classic text binary-classification teaching set for naive Bayes, SVM, and friends.",
    "cols": [
      {
        "n": "Category",
        "t": "category",
        "r": "target",
        "d": "spam / ham"
      },
      {
        "n": "Message",
        "t": "text",
        "r": "feature",
        "d": "email body"
      }
    ],
    "target": "Category (spam/ham binary)",
    "quality": [
      "5572 rows x 2 cols, fairly balanced",
      "English corpus; body has special symbols / URLs / HTML",
      "Single text column; preprocessing is key"
    ],
    "tasks": [
      "Text binary classification (spam)"
    ],
    "models": [
      "Baseline: TF-IDF + naive Bayes / linear SVM",
      "Strip leaky features like headers / signatures",
      "Advanced: character-level CNN / Transformer"
    ],
    "limits": [
      "English-only, ineffective on non-English spam",
      "Spam evolves fast; models drift (concept drift)",
      "Contains private email content; anonymize for display"
    ],
    "source": "Kaggle (venky73)",
    "license": "CC0",
    "results": [
      "TF-IDF + naive Bayes / linear SVM already reach ~97-98% accuracy; character-level CNN / Transformer add a bit more.",
      "Strip email headers / signatures (which leak the label) and split strictly to avoid overfitting.",
      "Conclusion: spam has stable patterns in URLs, special symbols, and specific vocabulary, but performance drops outside English and under concept drift.",
      "Contains private email content; display / modeling must be anonymized."
    ],
    "cite": "Kaggle Spam Mails Dataset (venky73).",
    "writeup": "**One-line takeaway**: Spam detection is a 97%-accurate solved textbook problem - until language, time, and privacy enter.\n\n### What is it really about?\n5,572 emails labeled spam or ham with the message body; the classic text binary-classification teaching set for naive Bayes, SVM, and friends.\n\n### What works\nTF-IDF + naive Bayes or linear SVM already hit ~97-98% accuracy; character-level CNNs / transformers push a bit further. URL patterns, special symbols, and certain vocabulary are stable spam signals.\n\n### The leakage trap\nStrip email headers / signatures (which can leak the label) and split strictly to avoid overfitting.\n\n### Honest limitations\nEnglish-only, so it fails on non-English spam. Spam evolves fast - models drift as attackers adapt. The corpus contains private email content, so any display or modeling must be anonymized.\n\n### Why it matters\nIt is the gentlest introduction to text classification: a tiny bag-of-words model beats fancy ones. But it also shows the ceiling - real spam defense must handle new languages, adversarial drift, and privacy, none of which this tidy dataset captures."
  },
  "datasnaek/youtube-new": {
    "title": "YouTube Trending (EN)",
    "desc": "Daily YouTube trending charts across US/GB/DE/CA/FR/RU/IN and more: title, channel, category, views/likes/dislikes/comments, and trending date. Suited to views prediction, category analysis, and time-series mining.",
    "cols": [
      {
        "n": "video_id",
        "t": "text",
        "r": "identifier",
        "d": "video id"
      },
      {
        "n": "trending_date",
        "t": "date",
        "r": "feature",
        "d": "trending date"
      },
      {
        "n": "title / channel_title",
        "t": "text",
        "r": "feature",
        "d": "title / channel"
      },
      {
        "n": "category_id",
        "t": "int",
        "r": "feature",
        "d": "category (needs mapping table)"
      },
      {
        "n": "publish_time",
        "t": "datetime",
        "r": "feature",
        "d": "publish time"
      },
      {
        "n": "views / likes / dislikes / comment_count",
        "t": "int",
        "r": "feature",
        "d": "interaction metrics"
      },
      {
        "n": "comments_disabled / ratings_disabled",
        "t": "int",
        "r": "feature",
        "d": "toggle flags"
      },
      {
        "n": "description",
        "t": "text",
        "r": "feature",
        "d": "video description"
      }
    ],
    "target": "Regression (predict views) or classification (category / viral)",
    "quality": [
      "Multi-country multi-file; single country file 45-76MB",
      "Same video repeats across trending days (deduplicate)",
      "category_id needs each country's categories.json mapping"
    ],
    "tasks": [
      "Regression (views prediction)",
      "Classification (category)",
      "Time-series trend"
    ],
    "models": [
      "Gradient boosting predicts views; mind country differences and dedup",
      "After category mapping, analyze category mix and virality",
      "Time-series: model trend duration"
    ],
    "limits": [
      "Only trending videos - severe selection bias",
      "Countries differ culturally / by platform; do not naively merge",
      "Large files (some 60-76MB); process in chunks",
      "category_id is an integer needing external mapping"
    ],
    "source": "Kaggle (datasnaek)",
    "license": "CC0",
    "results": [
      "Gradient boosting predicts views with R2 0.4-0.7 (interactions strongly affected by country / timing); same video over multiple days must be deduped first.",
      "After mapping category_id, analyze category distribution and virality: entertainment / music dominate.",
      "Time-series: trend duration and publish-to-trend lag can be modeled.",
      "WARNING: only trending videos, severe selection bias - do not extrapolate to the whole platform."
    ],
    "cite": "Kaggle Trending YouTube Video Statistics (datasnaek).",
    "writeup": "**One-line takeaway**: Trending-video data is great for time-series practice and terrible for generalization - because trending is a curated, biased slice, not the whole platform.\n\n### What is it really about?\nDaily YouTube trending charts across US/GB/DE/CA/FR/RU/IN and more: title, channel, category, views/likes/dislikes/comments, and trending date. Suited to views prediction, category analysis, and time-series mining.\n\n### What works\nGradient boosting predicts views with R2 ~0.4-0.7 (interactions vary strongly by country and timing). The same video appears on multiple trending days, so deduplicate first. After mapping category_id via each country's categories.json, you can analyze category mix and virality. Time-series modeling can target trend duration and publish-to-trend lag.\n\n### Honest limitations\nOnly trending videos - severe selection bias; do not extrapolate to the full platform. Countries differ culturally and by platform, so do not naively merge. Files are large (some 60-76MB) and need chunked processing. category_id is an integer needing external mapping.\n\n### Why it matters\nIt teaches the selection-bias lesson hard: a model trained on what already trended cannot tell you what will. For analysts, the value is in method (dedup, mapping, time-series) more than in any universal virality formula."
  }
};
