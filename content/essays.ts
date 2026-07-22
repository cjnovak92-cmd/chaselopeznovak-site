export type Essay = {
  slug: string;
  title: string;
  publishedDate: string;
  publishedLabel: string;
  context: string;
  authorshipNote: string;
  body: string[];
  signature: string;
  closingNote: string;
  additionalReading: string[];
};

export const essays = [
  {
    slug: "a-pause-in-the-conduction-system",
    title: "A Pause in the Conduction System",
    publishedDate: "2024-03-12",
    publishedLabel: "March 12, 2024",
    context:
      "Originally written and released on 03/12/2024 while studying Cardiovascular Sonography at Concorde Career College in Portland, Oregon.",
    authorshipNote: "AI was not used while writing this essay.",
    body: [
      "Let’s review for a moment…",
      "The heart is a muscle that has this incredible ability to initiate electrical impulses and contract on its own, without the need for neural input. If we want to move a skeletal muscle—say, our left pinky finger—we first need to consciously input that want to our brain via thought; it is a voluntary movement. Whereas the heart moves and contracts without us telling it to do so; it has a mind of its own so to speak.",
      "This involuntary electrical impulse of the heart begins at the sinoatrial node nestled in the right atrium. The SA node is made of a group of teeny tiny cells that contain this unique power of spontaneous depolarization, or more formally, the power of automaticity.",
      "When these SA node cells depolarize, it begins a chain reaction, causing neighboring muscle cells to depolarize as well. This impulse of depolarization makes its way to the left atrium via Bachmann’s Bundle so that both atria depolarize in a coordinated way.",
      "However, back in the right atrium, the electrical impulse travels throughout the chamber until it reaches another node positioned at the bottom of the interatrial septum. This is the atrioventricular node and it is here where something truly fascinating happens: the electrical impulse stops.",
      "This pause in the electrical impulse is just as important as the propagation of it.",
      "The pause gives the atria the much-needed time to contract, ensuring it’s depositing as much of its blood content into the ventricle as it can. Just as important, the pause prevents the ventricle from contracting during this time that the atria are. Without the pause, the atria and ventricles would contract against one another and our poor cells would slowly begin gasping for air.",
      "~",
      "Now you’re probably thinking: “That’s great, Chase. Good job. You know the basics of the heart’s electrical system. I hope you know more than that ‘cause we have midterms tomorrow.”",
      "To which I would reply: “We have midterms tomorrow!?” ;)",
      "But it’s me, so I believe there is something much deeper here that we can take from this. Something we can learn from the heart and how it works and why it works the way it does.",
      "~",
      "For the heart to work effectively, the system that controls its ability to work, to pump, to do its job, must take a moment of rest; a moment of inactivity.",
      "This is not the same as diastole. Relaxation after contraction still implies activity. Rather, this pause is a moment of not doing.",
      "This past weekend, I had planned to study, but instead I felt lost. My attention was shot, my energy was all over the place. I didn’t know what to do with myself. I was feeling some heavy burnout. After I came home from a walk late Saturday morning, I randomly looked at my bookshelf and the first book I saw was: “Niksen: The Lost Art of Doing Nothing” by Maartje Willems and Lona Aalders. A tiny hardback book I had bought last year but had yet to crack open. As Paulo Coelho says in The Alchemist: “Learn to recognize omens, and follow them”. So I did.",
      "Niksen is a Dutch verb meaning “to do nothing”. This doesn’t mean sit on the couch and binge-watch Parks and Rec for 3 hours, or get lost in a novel or even sit on the cushion and focus on your breath for 20 minutes. It means literally the absence of activity. Not an easy task for a culture that celebrates and encourages productivity and accomplishment (even binge-watching 3 hours of TV), while disparaging idleness and leisure. And if we do indulge, IT MUST BE EARNED.",
      "To sit and do nothing seems nearly impossible; to stare out the window and let our mind wander. If we’re not properly stimulated, we begin to feel bored and humans despise boredom.",
      "But with a pause comes space. Mental space that gives our thoughts room to traverse our mind without getting pulled in another direction via activity and stimulus and distraction. This is where creativity blooms. Our mind can make connections that it wouldn’t otherwise be able to when bombarded with busyness and action.",
      "Niksen suggests that when we take time to pause our current activity, our current impulse, if even just for a few moments (a tenth of a second if you’re the electricity in our heart), some lost energy is restored.",
      "As I continue through this program, I will continue to be inspired by the heart. I will remember to pause, just like the conduction system of the heart does, and give my mind and body moments of respite.",
    ],
    signature: "~ Chase Lopez Novak",
    closingNote: "All words are mine and mine alone. Take them with a grain of salt.",
    additionalReading: [
      "The Lost Art of Doing Nothing by Maartje Willems and Lona Aalders",
      "The Alchemist by Paulo Coelho",
    ],
  },
] satisfies Essay[];

export const latestEssay = essays.reduce((latest, essay) =>
  essay.publishedDate > latest.publishedDate ? essay : latest,
);

export function getEssayBySlug(slug: string) {
  return essays.find((essay) => essay.slug === slug);
}
