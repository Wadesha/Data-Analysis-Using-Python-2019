/* 20 domain templates in English (v3.0 bilingual zeroing).
   Mirrors web/data/domain_templates.js field-for-field. In EN mode, detail.js
   merges these over the zh templates so the 518 honest-fallback remote datasets
   render fully in English. Hand-written, domain-specific (not boilerplate).
   Edited directly; gen_site.py does not overwrite it. */
window.DOMAIN_TEMPLATES_EN = {
  "Audio/Speech": {
    "intro": "Audio and speech datasets covering automatic speech recognition (ASR), speaker identification, music classification, and environmental sound detection, mostly WAV/FLAC audio with annotation files.",
    "analysis": ["Sample-rate / channel / duration consistency", "Class balance (avoid inaudible minority classes)", "Transcription or label quality review", "Data-augmentation feasibility (speed perturbation, noise, reverb)", "Privacy of biometric info such as voiceprints"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Preprocess: resample, frame, extract MFCC", "Baseline: CNN / TDNN; advanced: self-supervised Wav2Vec2", "Ensure test-set speakers do not overlap with training"],
    "example": "Show the class list and sample notes; remote data via Kaggle preview or locally rendered waveform illustration.",
    "process": "Retrieve → download → segment/resample → feature extraction → train acoustic model → evaluate (WER / accuracy)."
  },
  "Biology/Science": {
    "intro": "Biological and scientific datasets including gene sequences, proteins, species observations, and experimental measurements, mostly tabular or FASTA/CSV, often with strict experimental designs.",
    "analysis": ["Missing values and outliers (instrument / experiment error)", "Class imbalance (rare classes)", "Sequence-length distribution and alignment", "Batch effect", "Reproducibility and statistical power"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Mind units, species, and experimental conditions", "Baseline: random forest / logistic regression + cross-validation", "Advanced: sequence models (CNN/RNN) for omics data"],
    "example": "Tabular field explanation + target distribution; charts generated for local data, remote data on Kaggle.",
    "process": "Retrieve → download → QC → feature engineering → train baseline → statistical validation."
  },
  "Computer Vision": {
    "intro": "Vision datasets covering image classification, object detection, medical imaging, and satellite imagery, mostly image directories or archives with diverse annotation formats (bbox/mask/keypoint).",
    "analysis": ["Class distribution and sample-size balance", "Image resolution / channel consistency", "Annotation quality and bounding-box coverage", "Data-augmentation feasibility and overfitting risk", "Representativeness of train/val/test splits"],
    "guidance": ["Download: kaggle datasets download -d <ref> --unzip", "Preprocess: resize, normalize, augment", "Baseline: ResNet / EfficientNet transfer learning", "Advanced: YOLO for detection, U-Net / Mask R-CNN for segmentation"],
    "example": "Show the class list and sample notes; remote data via Kaggle preview or locally rendered illustration.",
    "process": "Retrieve → download → annotation check → preprocess/augment → train CNN → evaluate (acc / mAP)."
  },
  "Education": {
    "intro": "Education datasets including student grades, learning behaviors, MOOC interactions, and surveys, suitable for education-equity, learning analytics, and grade-prediction research.",
    "analysis": ["Distribution and skewness of grades/scores", "Group fairness (gender, ethnicity, socio-economics)", "Missing values and dropout bias", "Correlation ≠ causation (e.g., lunch subsidy as socioeconomic proxy)", "Feasibility of longitudinal tracking"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Clean: unify encoding, handle proxy variables", "Baseline: linear / logistic regression", "Advanced: multi-output modeling, causal inference (with care)"],
    "example": "Field explanation + distribution; remote data via Kaggle preview.",
    "process": "Retrieve → download → EDA → feature construction → train baseline → interpret."
  },
  "Energy/Industry": {
    "intro": "Energy and industrial datasets including power load, wind/solar, equipment sensors, and manufacturing processes, mostly high-frequency time series emphasizing forecasting and anomaly detection.",
    "analysis": ["Time-series trend and seasonality", "Gaps from missing data and downtime", "Outliers (extreme operating conditions)", "Future-information leakage checks in features", "Unit and magnitude consistency"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Process: resample, rolling/lag statistics", "Baseline: linear regression / ARIMA forecast", "Advanced: LightGBM / LSTM / Prophet"],
    "example": "Field notes + key distributions; remote data mainly via Kaggle preview.",
    "process": "Retrieve → download → time alignment → feature construction → train → backtest evaluation."
  },
  "Entertainment/Media": {
    "intro": "Entertainment and media datasets including box office, music, games, and book ratings, mostly rating/metadata tables, suitable for recommendation and trend analysis.",
    "analysis": ["Rating distribution and skewness (most are mediocre)", "Long tail (few hits / niche items)", "Category / genre label coverage", "User selection bias", "Time trends and seasonality"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Clean: unify currency/units, dedupe", "Baseline: regression / collaborative filtering", "Advanced: matrix factorization, deep recommenders"],
    "example": "Category notes + distribution; remote data via Kaggle preview.",
    "process": "Retrieve → download → aggregate → EDA → recommendation/prediction model."
  },
  "Environment": {
    "intro": "Environmental datasets including air quality, weather, remote sensing, and ecological observations, mostly spatio-temporal grids or station series, emphasizing geographic coverage and sustainability analysis.",
    "analysis": ["Spatio-temporal coverage density and gaps", "Missing data (station offline / cloud occlusion)", "Outliers (extreme weather)", "Units and magnitudes", "Geographic and population bias"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Process: spatial join, interpolation", "Baseline: regression / random forest", "Advanced: LSTM / graph neural networks"],
    "example": "Field notes; remote data via Kaggle preview.",
    "process": "Retrieve → download → QC → spatial features → model."
  },
  "Finance/Economics": {
    "intro": "Finance and economics datasets including stock prices, cryptocurrencies, credit, fraud, and insurance, with emphasis on time series, risk, and extreme events.",
    "analysis": ["Time-series trend and seasonality", "Class imbalance (fraud / default are rare)", "Timestamp continuity and gaps", "Outliers (extreme market moves)", "Future-information leakage checks in features"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Process: resample, rolling statistics", "Baseline: logistic regression (classification) / ARIMA (forecast)", "Advanced: LightGBM / LSTM"],
    "example": "Field notes + key distributions; remote data mainly via Kaggle preview.",
    "process": "Retrieve → download → time alignment → feature construction → train → backtest evaluation."
  },
  "Food/Agriculture": {
    "intro": "Food and agriculture datasets including crop quality, yield, nutrition, and soil, mostly physicochemical tables, suitable for quality prediction and interpretability research.",
    "analysis": ["Physicochemical indicator distribution", "Ordered classes that are often imbalanced", "Missing values (tests not covered)", "Regional and variety bias", "Feature selection and interpretability"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Baseline: regression / classification + cross-validation", "Advanced: feature selection, gradient boosting", "Mind the handling of ordinal labels"],
    "example": "Field explanation + distribution; local data (e.g., wine) already charted, remote on Kaggle.",
    "process": "Retrieve → download → EDA → feature engineering → train baseline → interpret."
  },
  "Government": {
    "intro": "Government and public datasets including population, elections, crime, and open data, mostly statistical tables or geographic boundaries, emphasizing compliance and de-identification.",
    "analysis": ["Coverage bias (urban/rural / administrative region)", "Administrative-division and coding consistency", "Missing data and caliber differences", "Privacy and de-identification requirements", "Data timeliness and versioning"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Process: spatial join, caliber alignment", "Baseline: descriptive stats / regression", "Mind compliance and redistribution license"],
    "example": "Field notes; remote data via Kaggle preview.",
    "process": "Retrieve → download → clean → spatial/statistical analysis and visualization."
  },
  "Health/Medical": {
    "intro": "Health and medical datasets such as diabetes, stroke, heart disease, and cancer, mostly tabular clinical records, with highly sensitive privacy and licensing, limited to research/education use.",
    "analysis": ["Target-variable (illness / recurrence) imbalance ratio", "Missing values and outliers (clinical measurements)", "Feature correlation (avoid leakage variables)", "Population stratification and interpretability", "Scope of use per ethics review"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Note: education/research only, obey license", "Baseline: logistic regression / random forest + cross-validation", "Advanced: XGBoost / interpretable models (SHAP)"],
    "example": "Tabular field explanation + target-column distribution chart (local data charted); remote on Kaggle.",
    "process": "Retrieve → download → missing-value handling → feature engineering → train baseline → SHAP explanation."
  },
  "Housing/Real Estate": {
    "intro": "Housing and real-estate datasets such as house prices, rentals, and listings, suitable for regression prediction and geospatial analysis.",
    "analysis": ["Price distribution and skewness (right-skewed)", "Location / area driving features", "Missing data (luxury homes / anomalous listings)", "Spatio-temporal trends", "Feature engineering (house age / location)"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Clean: unify currency/units", "Baseline: linear regression / ridge regression", "Advanced: gradient boosting + geographic features"],
    "example": "Field notes + category distribution; remote data via Kaggle preview.",
    "process": "Retrieve → download → features → regression model → evaluate."
  },
  "Jobs/Labor": {
    "intro": "Recruitment and labor datasets including job descriptions, salaries, and skill tags, mostly tabular + text hybrid, suitable for salary prediction and skill-trend analysis.",
    "analysis": ["Salary distribution and skewness", "Class imbalance (scarce roles)", "Noise and parsing of text fields (JD)", "Regional differences", "Gender / ethnicity bias risk"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Process: parse text, unify job titles", "Baseline: regression / classification", "Advanced: NLP skill-entity extraction"],
    "example": "Field notes; remote data via Kaggle preview.",
    "process": "Retrieve → download → text parsing → EDA → model."
  },
  "Language": {
    "intro": "Language and linguistics datasets including grammar, dialects, multilingual corpora, and language identification, mostly text or audio-video aligned, suitable for cross-lingual and annotation research.",
    "analysis": ["Language / dialect balance", "Annotation consistency and expert disagreement", "Text-length distribution", "Encoding and language-detection consistency", "Train-test leakage checks"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Clean: unify UTF-8 encoding", "Baseline: bag-of-words / fastText", "Advanced: multilingual Transformer fine-tuning"],
    "example": "Show sample text; remote data previewed via Kaggle (first rows).",
    "process": "Retrieve → download → clean → vectorize → train baseline → evaluate."
  },
  "NLP/Text": {
    "intro": "Text datasets covering sentiment analysis, fake-news detection, spam, and translation — natural language processing tasks, mostly CSV/JSON text rows.",
    "analysis": ["Text-length and word-frequency distribution", "Class balance (avoid majority-class bias)", "Stopwords / special symbols / HTML noise", "Language detection and encoding consistency", "Duplicate samples and train-test leakage checks"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Clean: denoise, tokenize, unify UTF-8", "Baseline: TF-IDF + logistic regression / Naive Bayes", "Advanced: Transformer (BERT-family) fine-tuning"],
    "example": "Show sample text per field; remote data previewed via Kaggle link (first rows).",
    "process": "Retrieve → download → text cleaning → vectorize → train baseline → evaluate; scripts on the Process page."
  },
  "Sales/Retail": {
    "intro": "Sales and retail datasets such as supermarket sales, e-commerce, customers, and marketing, suitable for exploratory analysis, demand forecasting, and customer segmentation.",
    "analysis": ["Sales/volume distribution and long tail", "Store / category aggregation", "Holiday and promotion effects", "Missing data and return records", "Feasibility of customer segmentation"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Clean: unify currency/units", "Baseline: time series / regression forecast", "Advanced: RFM segmentation + gradient boosting"],
    "example": "Field explanation + category distribution; remote data via Kaggle preview.",
    "process": "Retrieve → download → aggregate → EDA → forecast/segmentation model."
  },
  "Security": {
    "intro": "Security and network datasets including intrusion detection, malware, and fraud, with extremely imbalanced classes, emphasizing detection over accuracy.",
    "analysis": ["⚠️ Extremely imbalanced classes (attacks / fraud are rare)", "Class overlap and noisy labels", "Future-information leakage checks in features", "Adversarial samples and drift", "Privacy and compliance"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Imbalance handling: SMOTE / class weights / downsampling", "Baseline: Isolation Forest / GBDT", "Evaluate by Recall / PR-AUC, never raw accuracy"],
    "example": "Field notes; remote data mainly via Kaggle preview.",
    "process": "Retrieve → download → imbalance handling → train → evaluate by detection rate."
  },
  "Social/Web": {
    "intro": "Social and web datasets including tweets, Reddit, comments, and graph structures, suitable for diffusion, community, and text analysis, but with high privacy and bias risk.",
    "analysis": ["Graph structure / degree distribution", "Text-content noise", "Bot / astroturf identification", "Sampling and platform bias", "⚠️ PII (personal data) de-identification"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Build graph / text features", "Baseline: node classification / community detection", "Advanced: graph neural networks (GNN)"],
    "example": "Field notes; remote data via Kaggle preview.",
    "process": "Retrieve → download → clean → graph construction → model."
  },
  "Sports": {
    "intro": "Sports datasets including match results, player and event statistics, suitable for performance prediction, win-probability estimation, and tactical analysis.",
    "analysis": ["Season / league bias", "Missing data (injuries / no appearance)", "Distribution and home-field effect", "Feature construction (Elo / momentum)", "Time-series continuity"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Aggregate: by player / team / season", "Baseline: regression / classification", "Advanced: Elo rating, time series"],
    "example": "Field notes; remote data via Kaggle preview.",
    "process": "Retrieve → download → EDA → features → model."
  },
  "Time Series": {
    "intro": "General time-series datasets including stock prices, weather, IoT, and sales, emphasizing forecasting, anomaly detection, and frequency alignment.",
    "analysis": ["Trend / seasonality / stationarity", "Missing values and interpolation strategy", "Sampling-frequency consistency", "⚠️ Future-information leakage (label leakage)", "Anomaly-point detection"],
    "guidance": ["Download: kaggle datasets download -d <ref>", "Process: resample, lag/rolling features", "Baseline: ARIMA / Prophet", "Advanced: LSTM / TFT / temporal Transformer"],
    "example": "Field notes + key distributions; remote data mainly via Kaggle preview.",
    "process": "Time alignment → feature construction → forecast → rigorous backtest."
  }
};
