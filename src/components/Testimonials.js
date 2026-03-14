import { createIcons, Star, CheckCircle, ArrowRight } from 'lucide';

export function renderTestimonials(isPreview = false) {
  const container = document.querySelector('#testimonials');
  if (!container) return;
  
  const allReviews = [
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
      comment: "Elite Loan Strategies is in a great location! It's easy to find and close to many other businesses, making it convenient for clients. The area feels safe and welcoming, which is important when dealing with financial matters. Overall, the prime spot adds to the positive experience when visiting their office.",
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
    },
    {
      name: "Sumanth",
      rating: 5.0,
      stats: "65 reviews",
      title: "Excellent transparency",
      comment: "I was worried about hidden costs, but Elite Loan Strategies was completely transparent. Their team explained everything clearly. Great experience! No surprises at the end, just honest guidance.",
      time: "2 months ago"
    },
    {
      name: "Pooja",
      rating: 5.0,
      stats: "88 reviews",
      title: "Reliable service",
      comment: "The team at Elite Loan is highly reliable. They helped me get my home loan approved when other banks were taking too long. Truly professional and dedicated to their clients' goals.",
      time: "2 months ago"
    },
    {
      name: "Vikram",
      rating: 5.0,
      stats: "45 reviews",
      title: "Fast processing",
      comment: "Needed a business loan urgently and they delivered! The processing was incredibly fast and the interest rates were better than expected. Highly recommend for any business owner.",
      time: "1 month ago"
    }
  ];

  const displayReviews = isPreview ? allReviews.slice(0, 3) : allReviews;

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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        ${displayReviews.map((review, index) => `
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

      ${isPreview ? `
        <div class="text-center" data-aos="fade-up">
          <button id="view-all-reviews" class="inline-flex items-center space-x-2 bg-white text-primary border-2 border-primary px-10 py-4 rounded-xl font-bold hover:bg-primary/5 transition-smooth shadow-lg group">
            <span>View All Reviews</span>
            <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      ` : `
        <div class="text-center" data-aos="fade-up">
          <button id="show-less-reviews" class="inline-flex items-center space-x-2 bg-white text-ash border-2 border-ash/20 px-10 py-4 rounded-xl font-bold hover:bg-ash/5 transition-smooth shadow-lg group">
            <span>Show Less</span>
            <i data-lucide="arrow-right" class="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform"></i>
          </button>
        </div>
      `}
    </div>
  `;

  // Attach event listeners
  if (isPreview) {
    const viewAllBtn = document.querySelector('#view-all-reviews');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', () => {
        renderTestimonials(false);
        // Scroll slightly to the top of the section to show the new reviews
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  } else {
    const showLessBtn = document.querySelector('#show-less-reviews');
    if (showLessBtn) {
      showLessBtn.addEventListener('click', () => {
        renderTestimonials(true);
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  // Re-initialize icons
  createIcons({
    icons: { Star, CheckCircle, ArrowRight }
  });
}
