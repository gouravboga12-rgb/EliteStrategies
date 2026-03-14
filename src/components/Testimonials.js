export function renderTestimonials() {
  const container = document.querySelector('#testimonials');
  if (!container) return;
  
  const reviews = [
    {
      name: "Anu Roy",
      rating: 5.0,
      stats: "70 reviews",
      title: "Reasonable fees",
      comment: "Elite Loan Strategies has reasonable fees. They are clear and fair, making it easy to understand what you pay. Customers feel good about the prices because they get good service for their money. Overall, people are happy with the costs and think it's a smart choice for loans.",
      time: "3 months ago"
    },
    {
      name: "raj",
      rating: 5.0,
      stats: "121 reviews",
      title: "Prime location",
      comment: "Elite Loan Strategies is in a great location! It's easy to find and close to many other businesses, making it convenient for clients. The area feels safe and welcoming, which is important when dealing with financial matters. Highly recommend checking them out!",
      time: "3 months ago"
    },
    {
      name: "Dilip Kumar",
      rating: 5.0,
      stats: "70 reviews",
      title: "Knowledgeable staff",
      comment: "At Elite Loan Strategies, my experience was exceptional thanks to their knowledgeable staff. They guided me through the loan process with expertise and clarity, answering all my questions thoroughly. Their professionalism and understanding of the financial landscape made me feel confident in my decisions.",
      time: "3 months ago"
    },
    {
      name: "AVINASH",
      rating: 5.0,
      stats: "73 reviews",
      title: "Professional firm",
      comment: "Elite Loan Strategies is a very professional firm. They help with banking and finance services. The staff is friendly and knows a lot about loans. They answer all questions clearly. I felt supported during the whole process. If you need financial help, I recommend Elite Loan Strategies!",
      time: "3 months ago"
    },
    {
      name: "Rajesh",
      rating: 5.0,
      stats: "72 reviews",
      title: "Easily accessible",
      comment: "Elite Loan Strategies is an outstanding service in the banking and finance sector. Their team is incredibly knowledgeable and offers personalized solutions tailored to individual needs. What I appreciate most is how easily accessible they are, making the loan application process smooth.",
      time: "3 months ago"
    }
  ];

  container.className = 'py-20 bg-gray-50 overflow-hidden';
  container.innerHTML = `
    <div class="container mx-auto px-6 md:px-12">
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Customer Proof</h2>
        <h3 class="text-3xl md:text-5xl font-bold text-ash mb-6">What Our Clients Say</h3>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Join thousands of satisfied customers who have experienced our professional and transparent financial services.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${reviews.map((review, index) => `
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl uppercase">
                ${review.name.charAt(0)}
              </div>
              <div>
                <h4 class="font-bold text-ash leading-none">${review.name}</h4>
                <p class="text-xs text-gray-400 mt-1">${review.stats}</p>
              </div>
              <div class="ml-auto text-xs text-gray-400">
                ${review.time}
              </div>
            </div>
            
            <div class="flex items-center space-x-1 mb-4 text-primary">
              ${Array(5).fill('<i data-lucide="star" class="w-4 h-4 fill-current"></i>').join('')}
              <span class="ml-2 text-sm font-bold text-ash">${review.rating.toFixed(1)}</span>
            </div>

            <h5 class="font-bold text-ash mb-3">${review.title}</h5>
            <p class="text-sm text-gray-600 leading-relaxed mb-6 italic">
              "${review.comment}"
            </p>
            
            <div class="mt-auto flex items-center text-primary text-xs font-bold uppercase tracking-widest">
              <i data-lucide="check-circle" class="w-4 h-4 mr-2"></i>
              Verified Client
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
