export interface TarotCard {
  number: number;
  name: string;
  arcana: 'major' | 'minor';
  suit?: string;
  element: string;
  planet: string;
  upright: string;
  reversed: string;
  love: string;
  career: string;
  yesNo: 'yes' | 'no' | 'maybe';
  keywords: string[];
}

export const majorArcana: TarotCard[] = [
  { number: 0, name: "The Fool", arcana: 'major', element: "Air", planet: "Uranus", upright: "Beginnings, innocence, spontaneity, free spirit", reversed: "Holding back, recklessness, risk-taking", love: "New romance, adventure in love, taking a leap of faith", career: "New career path, exciting opportunity, fresh start", yesNo: "yes", keywords: ["beginnings", "innocence", "adventure"] },
  { number: 1, name: "The Magician", arcana: 'major', element: "Air", planet: "Mercury", upright: "Manifestation, resourcefulness, power, inspired action", reversed: "Manipulation, poor planning, untapped talents", love: "Magnetic attraction, making things happen in love", career: "Skill mastery, new venture, using all resources", yesNo: "yes", keywords: ["manifestation", "power", "skill"] },
  { number: 2, name: "The High Priestess", arcana: 'major', element: "Water", planet: "Moon", upright: "Intuition, sacred knowledge, divine feminine, subconscious", reversed: "Secrets, disconnected from intuition, withdrawal", love: "Trust your intuition about your partner, mystery", career: "Hidden knowledge surfacing, trust your gut", yesNo: "maybe", keywords: ["intuition", "mystery", "wisdom"] },
  { number: 3, name: "The Empress", arcana: 'major', element: "Earth", planet: "Venus", upright: "Femininity, beauty, nature, nurturing, abundance", reversed: "Creative block, dependence, emptiness", love: "Fertile love, deepening romance, nurturing partner", career: "Creative projects flourish, abundance in work", yesNo: "yes", keywords: ["abundance", "fertility", "nurturing"] },
  { number: 4, name: "The Emperor", arcana: 'major', element: "Fire", planet: "Aries", upright: "Authority, establishment, structure, father figure", reversed: "Domination, excessive control, lack of discipline", love: "Stable committed relationship, traditional values", career: "Leadership role, authority, organizational success", yesNo: "yes", keywords: ["authority", "structure", "leadership"] },
  { number: 5, name: "The Hierophant", arcana: 'major', element: "Earth", planet: "Taurus", upright: "Spiritual wisdom, religious beliefs, conformity, tradition", reversed: "Personal beliefs, freedom, challenging status quo", love: "Commitment, marriage, conventional relationship", career: "Mentorship, traditional career path, institutions", yesNo: "maybe", keywords: ["tradition", "wisdom", "conformity"] },
  { number: 6, name: "The Lovers", arcana: 'major', element: "Air", planet: "Gemini", upright: "Love, harmony, relationships, values alignment, choices", reversed: "Self-love needed, disharmony, imbalance", love: "Deep soul connection, soulmate energy, major choice", career: "Partnership opportunity, values-based decisions", yesNo: "yes", keywords: ["love", "harmony", "choice"] },
  { number: 7, name: "The Chariot", arcana: 'major', element: "Water", planet: "Cancer", upright: "Control, willpower, success, action, determination", reversed: "Self-discipline lacking, opposition, no direction", love: "Pursuing love with determination, overcoming obstacles", career: "Career victory, promotion, achieving goals", yesNo: "yes", keywords: ["victory", "willpower", "determination"] },
  { number: 8, name: "Strength", arcana: 'major', element: "Fire", planet: "Leo", upright: "Strength, courage, persuasion, influence, compassion", reversed: "Inner strength lacking, self-doubt, raw emotion", love: "Patient love, taming passions, emotional strength", career: "Quiet confidence wins, persistence pays off", yesNo: "yes", keywords: ["courage", "patience", "inner power"] },
  { number: 9, name: "The Hermit", arcana: 'major', element: "Earth", planet: "Virgo", upright: "Soul searching, introspection, being alone, inner guidance", reversed: "Isolation, loneliness, withdrawal", love: "Time alone needed, reflecting on what you want", career: "Mentoring, solo work, seeking deeper purpose", yesNo: "no", keywords: ["solitude", "wisdom", "introspection"] },
  { number: 10, name: "Wheel of Fortune", arcana: 'major', element: "Fire", planet: "Jupiter", upright: "Good luck, karma, life cycles, destiny, turning point", reversed: "Bad luck, resistance to change, breaking cycles", love: "Fated meeting, relationship turning point", career: "Lucky break, unexpected opportunity", yesNo: "yes", keywords: ["destiny", "luck", "cycles"] },
  { number: 11, name: "Justice", arcana: 'major', element: "Air", planet: "Libra", upright: "Justice, fairness, truth, cause and effect, law", reversed: "Unfairness, lack of accountability, dishonesty", love: "Fair and balanced relationship, karmic justice", career: "Legal matters, fair outcome, ethical decisions", yesNo: "maybe", keywords: ["truth", "fairness", "karma"] },
  { number: 12, name: "The Hanged Man", arcana: 'major', element: "Water", planet: "Neptune", upright: "Pause, surrender, letting go, new perspectives", reversed: "Delays, resistance, stalling, indecision", love: "Seeing relationship from new angle, patience", career: "Career pause, new perspective on work", yesNo: "maybe", keywords: ["surrender", "perspective", "pause"] },
  { number: 13, name: "Death", arcana: 'major', element: "Water", planet: "Scorpio", upright: "Endings, change, transformation, transition", reversed: "Resistance to change, personal transformation", love: "Relationship transformation, ending old patterns", career: "Career ending leading to better beginning", yesNo: "no", keywords: ["transformation", "endings", "rebirth"] },
  { number: 14, name: "Temperance", arcana: 'major', element: "Fire", planet: "Sagittarius", upright: "Balance, moderation, patience, purpose", reversed: "Imbalance, excess, self-healing, realignment", love: "Balanced partnership, patience in love", career: "Work-life balance, patient career growth", yesNo: "maybe", keywords: ["balance", "patience", "moderation"] },
  { number: 15, name: "The Devil", arcana: 'major', element: "Earth", planet: "Capricorn", upright: "Shadow self, attachment, addiction, restriction", reversed: "Releasing limiting beliefs, detachment", love: "Intense passion, possible co-dependency", career: "Feeling trapped, unhealthy work environment", yesNo: "no", keywords: ["bondage", "temptation", "shadow"] },
  { number: 16, name: "The Tower", arcana: 'major', element: "Fire", planet: "Mars", upright: "Sudden change, upheaval, chaos, revelation", reversed: "Personal transformation, fear of change", love: "Relationship shakeup, truth revealed", career: "Sudden change leading to better path", yesNo: "no", keywords: ["upheaval", "revelation", "breakthrough"] },
  { number: 17, name: "The Star", arcana: 'major', element: "Air", planet: "Aquarius", upright: "Hope, faith, purpose, renewal, spirituality", reversed: "Lack of faith, despair, disconnection", love: "Renewed hope in love, healing heart", career: "Inspiration returns, dream career aligning", yesNo: "yes", keywords: ["hope", "healing", "inspiration"] },
  { number: 18, name: "The Moon", arcana: 'major', element: "Water", planet: "Pisces", upright: "Illusion, fear, anxiety, subconscious, intuition", reversed: "Release of fear, repressed emotion", love: "Confusion in love, hidden feelings", career: "Unclear situation, deception possible", yesNo: "no", keywords: ["illusion", "intuition", "subconscious"] },
  { number: 19, name: "The Sun", arcana: 'major', element: "Fire", planet: "Sun", upright: "Positivity, fun, warmth, success, vitality", reversed: "Inner child, feeling down, overly optimistic", love: "Joyful love, happy relationship", career: "Success, recognition, achievement", yesNo: "yes", keywords: ["joy", "success", "vitality"] },
  { number: 20, name: "Judgement", arcana: 'major', element: "Fire", planet: "Pluto", upright: "Judgement, rebirth, inner calling, absolution", reversed: "Self-doubt, inner critic, ignoring the call", love: "Relationship renewal, second chances", career: "Career calling, major evaluation", yesNo: "yes", keywords: ["rebirth", "calling", "awakening"] },
  { number: 21, name: "The World", arcana: 'major', element: "Earth", planet: "Saturn", upright: "Completion, integration, accomplishment, travel", reversed: "Seeking closure, short-cuts, delays", love: "Fulfilled love, complete relationship", career: "Goal achieved, project completion", yesNo: "yes", keywords: ["completion", "fulfillment", "wholeness"] },
];

function generateMinorArcana(): TarotCard[] {
  const suits: { name: string; element: string; planet: string; theme: string }[] = [
    { name: "Wands", element: "Fire", planet: "Mars", theme: "passion" },
    { name: "Cups", element: "Water", planet: "Venus", theme: "emotion" },
    { name: "Swords", element: "Air", planet: "Mercury", theme: "intellect" },
    { name: "Pentacles", element: "Earth", planet: "Saturn", theme: "material" },
  ];
  const ranks = ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Page","Knight","Queen","King"];
  const data: Record<string, { upright: string; reversed: string; love: string; career: string; yesNo: 'yes'|'no'|'maybe'; keywords: string[] }[]> = {
    Wands: [
      { upright:"Inspiration, new opportunities, growth, potential", reversed:"Delays, lack of direction, missed chances", love:"Exciting new romance, spark of passion", career:"New creative venture, entrepreneurial energy", yesNo:"yes", keywords:["inspiration","potential","spark"] },
      { upright:"Future planning, progress, decisions, discovery", reversed:"Fear of unknown, lack of planning", love:"Mutual attraction, deciding on next step", career:"Planning ahead, long-term vision", yesNo:"maybe", keywords:["planning","decisions","vision"] },
      { upright:"Expansion, foresight, overseas opportunities", reversed:"Obstacles, delays, frustration", love:"Long-distance love, growth in relationship", career:"Expansion, international opportunities", yesNo:"yes", keywords:["expansion","growth","foresight"] },
      { upright:"Celebration, joy, harmony, relaxation, homecoming", reversed:"Lack of harmony, incomplete, transition", love:"Celebration of love, happy home", career:"Milestone reached, team celebration", yesNo:"yes", keywords:["celebration","harmony","homecoming"] },
      { upright:"Competition, conflict, tension, diversity", reversed:"Avoiding conflict, inner harmony", love:"Disagreements, competition for attention", career:"Workplace competition, creative tension", yesNo:"no", keywords:["competition","conflict","diversity"] },
      { upright:"Victory, success, recognition, pride", reversed:"Lack of recognition, fall from grace", love:"Public recognition of love, triumph together", career:"Public victory, award, promotion", yesNo:"yes", keywords:["victory","success","pride"] },
      { upright:"Challenge, perseverance, competition, protection", reversed:"Giving up, overwhelmed, defensive", love:"Defending your relationship, standing ground", career:"Holding your position, fierce competition", yesNo:"maybe", keywords:["challenge","perseverance","defense"] },
      { upright:"Speed, action, movement, quick decisions", reversed:"Delays, frustration, slow progress", love:"Whirlwind romance, fast-moving love", career:"Fast progress, things moving quickly", yesNo:"yes", keywords:["speed","action","movement"] },
      { upright:"Resilience, courage, persistence, boundaries", reversed:"Overwhelm, paranoia, stubbornness", love:"Guarding your heart, resilience in love", career:"Standing your ground at work", yesNo:"maybe", keywords:["resilience","courage","boundaries"] },
      { upright:"Burden, responsibility, stress, hard work", reversed:"Releasing burdens, delegation", love:"Overwhelmed by relationship demands", career:"Overworked, too many responsibilities", yesNo:"no", keywords:["burden","responsibility","stress"] },
      { upright:"Exploration, enthusiasm, discovery, free spirit", reversed:"Lack of direction, procrastination", love:"Adventurous love, playful energy", career:"New creative ideas, enthusiastic start", yesNo:"yes", keywords:["exploration","enthusiasm","discovery"] },
      { upright:"Energy, passion, adventure, impulsiveness", reversed:"Haste, scattered energy, delays", love:"Passionate pursuit, adventurous partner", career:"Energetic approach, taking bold action", yesNo:"yes", keywords:["energy","passion","adventure"] },
      { upright:"Courage, determination, independence, social influence", reversed:"Selfishness, jealousy, demanding", love:"Confident, independent partner, passionate love", career:"Bold leadership, energetic management", yesNo:"yes", keywords:["courage","independence","confidence"] },
      { upright:"Natural leader, vision, entrepreneur, honor", reversed:"Impulsive, ruthless, high expectations", love:"Passionate, devoted partner with high standards", career:"Visionary leadership, successful entrepreneur", yesNo:"yes", keywords:["leadership","vision","honor"] },
    ],
    Cups: [
      { upright:"New feelings, intuition, intimacy, compassion", reversed:"Blocked emotions, emptiness", love:"New love beginning, emotional opening", career:"Creative inspiration, emotional fulfillment at work", yesNo:"yes", keywords:["love","intuition","emotion"] },
      { upright:"Unity, partnership, mutual attraction, balance", reversed:"Disharmony, mistrust, broken partnership", love:"Deep connection, mutual respect, attraction", career:"Business partnership, balanced collaboration", yesNo:"yes", keywords:["partnership","unity","attraction"] },
      { upright:"Celebration, friendship, creativity, community", reversed:"Overindulgence, gossip, isolation", love:"Celebration of love, social gatherings", career:"Team success, creative collaborations", yesNo:"yes", keywords:["celebration","friendship","creativity"] },
      { upright:"Apathy, contemplation, disconnection, meditation", reversed:"Awareness returning, motivation", love:"Boredom in relationship, taking love for granted", career:"Dissatisfaction, missing opportunities", yesNo:"no", keywords:["apathy","contemplation","retreat"] },
      { upright:"Loss, grief, disappointment, regret", reversed:"Acceptance, moving forward, finding peace", love:"Heartbreak, mourning lost love", career:"Loss at work, disappointment in career", yesNo:"no", keywords:["loss","grief","disappointment"] },
      { upright:"Nostalgia, childhood memories, innocence, joy", reversed:"Stuck in the past, naivety", love:"Childhood sweetheart, innocent love returning", career:"Returning to simpler approach, fond memories", yesNo:"yes", keywords:["nostalgia","innocence","joy"] },
      { upright:"Fantasy, illusion, wishful thinking, choices", reversed:"Alignment, personal values, focus", love:"Too many options, fantasy vs reality", career:"Many choices, need to focus on one path", yesNo:"maybe", keywords:["fantasy","choices","illusion"] },
      { upright:"Disappointment, abandonment, withdrawal, escape", reversed:"Trying again, staying, hopeful", love:"Walking away from love, emotional exhaustion", career:"Leaving unsatisfying job, seeking meaning", yesNo:"no", keywords:["abandonment","withdrawal","escape"] },
      { upright:"Contentment, satisfaction, gratitude, wish fulfillment", reversed:"Dissatisfaction, greed, materialism", love:"Wishes coming true in love, deep satisfaction", career:"Dream career achieved, contentment", yesNo:"yes", keywords:["contentment","wishes","satisfaction"] },
      { upright:"Harmony, marriage, happiness, alignment", reversed:"Disharmony, broken family, misalignment", love:"Happy family, lasting love, emotional fulfillment", career:"Harmonious workplace, team alignment", yesNo:"yes", keywords:["harmony","family","happiness"] },
      { upright:"Creative opportunity, intuition, curiosity", reversed:"Emotional immaturity, creative block", love:"New romantic message, sweet admirer", career:"Creative opportunity, inspired message", yesNo:"yes", keywords:["creativity","curiosity","message"] },
      { upright:"Romance, charm, imagination, beauty", reversed:"Unrealistic, jealousy, moodiness", love:"Romantic proposal, charming partner", career:"Creative pursuit, following your heart", yesNo:"yes", keywords:["romance","charm","imagination"] },
      { upright:"Compassion, calm, comfort, emotional security", reversed:"Martyrdom, insecurity, dependence", love:"Nurturing love, emotional support", career:"Supportive environment, emotional intelligence", yesNo:"yes", keywords:["compassion","calm","nurturing"] },
      { upright:"Emotional balance, generosity, diplomacy", reversed:"Moodiness, manipulation, emotional coldness", love:"Emotionally mature partner, wise counsel", career:"Diplomatic leadership, emotional wisdom", yesNo:"yes", keywords:["diplomacy","generosity","wisdom"] },
    ],
    Swords: [
      { upright:"Breakthrough, clarity, sharp mind, truth", reversed:"Confusion, chaos, lack of clarity", love:"Clear communication needed, breakthrough moment", career:"New idea, mental clarity, intellectual breakthrough", yesNo:"yes", keywords:["clarity","truth","breakthrough"] },
      { upright:"Difficult choices, indecision, stalemate, avoidance", reversed:"Information overload, lesser of two evils", love:"Difficult decision in relationship, denial", career:"Tough choice at work, need for compromise", yesNo:"maybe", keywords:["indecision","stalemate","balance"] },
      { upright:"Heartbreak, emotional pain, sorrow, grief, rejection", reversed:"Recovery, forgiveness, moving on", love:"Heartbreak, betrayal, painful separation", career:"Painful professional setback, criticism", yesNo:"no", keywords:["heartbreak","sorrow","pain"] },
      { upright:"Rest, restoration, contemplation, recuperation", reversed:"Restlessness, burnout, stagnation", love:"Time out from relationships, self-reflection", career:"Need to rest, taking a mental health break", yesNo:"maybe", keywords:["rest","contemplation","recovery"] },
      { upright:"Conflict, disagreements, tension, winning at all costs", reversed:"Reconciliation, making amends, past conflicts", love:"Arguments, dishonesty in relationship", career:"Workplace conflict, ethical compromise", yesNo:"no", keywords:["conflict","tension","disagreement"] },
      { upright:"Transition, change, leaving behind, moving on", reversed:"Unfinished business, resistance to change", love:"Moving forward after heartbreak, fresh start", career:"Career change, relocation, transition", yesNo:"maybe", keywords:["transition","change","moving on"] },
      { upright:"Deception, trickery, strategy, resourcefulness", reversed:"Coming clean, rethinking approach", love:"Dishonesty discovered, need for transparency", career:"Strategic thinking, unconventional approach", yesNo:"no", keywords:["deception","strategy","stealth"] },
      { upright:"Restriction, imprisonment, self-limiting beliefs", reversed:"Self-acceptance, new perspective, freedom", love:"Feeling trapped in relationship, self-imposed limits", career:"Feeling stuck, victim mentality at work", yesNo:"no", keywords:["restriction","limitation","trapped"] },
      { upright:"Anxiety, worry, fear, nightmares, overwhelm", reversed:"Inner turmoil ending, hope, recovery", love:"Anxiety about relationship, sleepless nights", career:"Work-related stress and anxiety", yesNo:"no", keywords:["anxiety","worry","fear"] },
      { upright:"Painful ending, deep wounds, betrayal, backstabbing", reversed:"Recovery, regeneration, fear of ruin", love:"Betrayal, painful ending of relationship", career:"Backstabbing at work, hitting rock bottom", yesNo:"no", keywords:["ending","betrayal","defeat"] },
      { upright:"Curiosity, restlessness, mental energy, vigilance", reversed:"Deception, all talk no action, haste", love:"Curious about love, exploring options", career:"New ideas, vigilant approach, sharp mind", yesNo:"maybe", keywords:["curiosity","vigilance","intellect"] },
      { upright:"Ambition, action, driven, fast thinking", reversed:"Restless, unfocused, burnout", love:"Fast-moving relationship, impulsive decisions", career:"Ambitious drive, quick career moves", yesNo:"yes", keywords:["ambition","action","speed"] },
      { upright:"Independent, unbiased judgment, clear boundaries", reversed:"Overly emotional, cold, cruel", love:"Setting boundaries, independent thinking", career:"Fair leadership, objective decisions", yesNo:"maybe", keywords:["independence","boundaries","clarity"] },
      { upright:"Intellectual power, authority, truth, clear thinking", reversed:"Manipulative, tyrannical, abusive power", love:"Need for honesty, intellectual connection", career:"Authority figure, strategic leadership", yesNo:"maybe", keywords:["authority","intellect","truth"] },
    ],
    Pentacles: [
      { upright:"New financial opportunity, manifestation, abundance", reversed:"Lost opportunity, lack of planning", love:"New relationship with material stability", career:"New job offer, financial opportunity", yesNo:"yes", keywords:["opportunity","manifestation","abundance"] },
      { upright:"Multiple priorities, adaptability, time management", reversed:"Over-committed, disorganized", love:"Juggling priorities in relationship", career:"Multitasking, managing multiple projects", yesNo:"maybe", keywords:["balance","adaptability","priorities"] },
      { upright:"Teamwork, collaboration, learning, implementation", reversed:"Lack of teamwork, disregard for skills", love:"Building together, collaborative relationship", career:"Apprenticeship, skill building, teamwork", yesNo:"yes", keywords:["teamwork","learning","mastery"] },
      { upright:"Security, conservation, control, stability", reversed:"Greed, materialism, self-protection", love:"Possessiveness, fear of losing partner", career:"Financial security, conservative approach", yesNo:"yes", keywords:["security","control","stability"] },
      { upright:"Financial loss, poverty, lack, isolation, worry", reversed:"Recovery, spiritual poverty, positive changes", love:"Financial strain on relationship, isolation", career:"Job loss, financial hardship", yesNo:"no", keywords:["loss","poverty","hardship"] },
      { upright:"Generosity, charity, giving, prosperity, sharing", reversed:"Debt, selfishness, one-sided charity", love:"Generous partner, balanced giving and receiving", career:"Pay raise, generous employer, sharing success", yesNo:"yes", keywords:["generosity","charity","prosperity"] },
      { upright:"Long-term vision, perseverance, sustainable results", reversed:"Lack of growth, impatience, shortcuts", love:"Patient investment in relationship", career:"Long-term investment paying off", yesNo:"maybe", keywords:["patience","investment","growth"] },
      { upright:"Apprenticeship, education, quality, engagement", reversed:"Lack of focus, perfectionism, no ambition", love:"Working on relationship skills", career:"Skill development, craftsmanship, diligence", yesNo:"yes", keywords:["craftsmanship","diligence","quality"] },
      { upright:"Abundance, luxury, self-sufficiency, financial independence", reversed:"Over-reliance on wealth, superficial", love:"Self-sufficient partner, enjoying luxury together", career:"Financial independence, enjoying success", yesNo:"yes", keywords:["abundance","luxury","independence"] },
      { upright:"Wealth, legacy, inheritance, establishment, retirement", reversed:"Financial failure, loneliness, loss", love:"Long-term stable relationship, family legacy", career:"Retirement, financial legacy, established career", yesNo:"yes", keywords:["wealth","legacy","establishment"] },
      { upright:"Manifestation, financial opportunity, new skill", reversed:"Lack of progress, procrastination", love:"Manifesting ideal partner, new beginning", career:"New financial opportunity, scholarship", yesNo:"yes", keywords:["manifestation","opportunity","skill"] },
      { upright:"Hard work, productivity, routine, conservatism", reversed:"Workaholic, boredom, laziness", love:"Stable and routine relationship", career:"Methodical worker, reliable employee", yesNo:"yes", keywords:["hard work","routine","productivity"] },
      { upright:"Nurturing, practical, providing, luxury, homebody", reversed:"Neglect, smothering, insecurity", love:"Nurturing, supportive, grounded partner", career:"Practical leadership, creating comfortable environment", yesNo:"yes", keywords:["nurturing","practical","luxury"] },
      { upright:"Wealth, business, leadership, security, discipline", reversed:"Financial ineptitude, obsessed with wealth", love:"Providing partner, secure relationship", career:"Business success, financial mastery", yesNo:"yes", keywords:["wealth","business","security"] },
    ],
  };

  const cards: TarotCard[] = [];
  let num = 22;
  for (const suit of suits) {
    const suitData = data[suit.name];
    suitData.forEach((d, i) => {
      cards.push({
        number: num++,
        name: `${ranks[i]} of ${suit.name}`,
        arcana: 'minor',
        suit: suit.name,
        element: suit.element,
        planet: suit.planet,
        ...d,
      });
    });
  }
  return cards;
}

export const minorArcana = generateMinorArcana();
export const allTarotCards: TarotCard[] = [...majorArcana, ...minorArcana];

// Spread types
export type SpreadType = 'single' | 'three-card' | 'celtic-cross' | 'yes-no';

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  position: string;
}

export function drawCards(spread: SpreadType): DrawnCard[] {
  const deck = [...allTarotCards];
  const drawn: DrawnCard[] = [];

  const positions: Record<SpreadType, string[]> = {
    'single': ['Card of the Day'],
    'three-card': ['Past', 'Present', 'Future'],
    'yes-no': ['Your Answer'],
    'celtic-cross': [
      'Present Situation', 'Challenge', 'Foundation',
      'Recent Past', 'Best Outcome', 'Near Future',
      'Your Approach', 'External Influences',
      'Hopes & Fears', 'Final Outcome'
    ],
  };

  const slots = positions[spread];
  for (let i = 0; i < slots.length; i++) {
    const idx = Math.floor(Math.random() * deck.length);
    const card = deck.splice(idx, 1)[0];
    drawn.push({
      card,
      isReversed: Math.random() < 0.35,
      position: slots[i],
    });
  }
  return drawn;
}
