/*
  YOUR PROJECTS
  =============
  This is the only file you need to edit to update the Projects section.

  - Order:   projects appear in the order they are listed here (top = first).
  - Hide one: set  show: false  (it stays here but won't appear on the page).
  - Add one: copy a whole { ... } block, paste it where you want it, change the text.
  - Optional fields (status, year, live, source, image) can be deleted or left as ''.

  Fields
    show     true or false
    icon     'chat' | 'cart' | 'db' | 'api' | 'game' | 'code'
    label    short type line in the card header, e.g. 'Full-stack · Web app'
    title    project name
    summary  one sentence on what it is
    points   2–3 bullet points
    tags     tech used
    status   e.g. 'Live' or 'In progress'
    year     e.g. '2026'
    live     link to the running app
    source   link to the GitHub repo
    image    path to a screenshot, e.g. 'images/chatbot.png' (put the file in an images folder next to index.html)

  After editing, save, commit and push. Vercel redeploys the site automatically.
*/
window.PROJECTS = [
  {
    show: true,
    icon: 'chat',
    label: 'AI · Chatbot',
    title: 'E-Commerce FAQ Chatbot with AI',
    summary: 'An AI chatbot that answers common customer questions for an online store, around the clock.',
    points: [
      'Uses NLP and a Keras model to understand customer queries',
      'Covers products, shipping, returns and account management',
      'Provides 24/7 automated support'
    ],
    tags: ['Python', 'Keras', 'NLP'],
    status: 'Live',
    year: '',
    live: 'https://e-commerce-faq-chatbot.onrender.com/',
    source: 'https://github.com/DhruvPC-ai/E-Commerce-FAQ-Chatbot',
    image: ''
  },
  {
    show: true,
    icon: 'cart',
    label: 'Full-stack · Web app',
    title: 'E-Commerce Website with Payment Gateway',
    summary: 'A full-stack online store with secure checkout.',
    points: [
      'Product management and user authentication',
      'Shopping cart and order processing',
      'PayPal payment gateway for secure online transactions'
    ],
    tags: ['PHP', 'MySQL', 'PayPal'],
    status: 'Live',
    year: '',
    live: 'https://kagaz-shop.onrender.com/',
    source: 'https://github.com/DhruvPC-ai/Kagaz',
    image: ''
  }
];
