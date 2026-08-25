import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  User, 
  Send,
  Car,
  ThumbsUp
} from 'lucide-react';
import { CustomerReviewItem } from '../types/database';
import { useContent } from '../context/ContentContext';

export const CustomerTestimonials: React.FC = () => {
  const { reviews, business } = useContent();
  const [localReviews, setLocalReviews] = useState<CustomerReviewItem[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState('');
  const [car, setCar] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Combine fetched reviews with newly submitted local reviews
  const allReviews = [...localReviews, ...reviews.filter(r => r.enabled !== false)];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newReview: CustomerReviewItem = {
      id: Date.now(),
      name: name.trim(),
      car: car.trim() || 'Verified Car Owner',
      rating,
      date: 'Just now',
      verified: true,
      text: text.trim(),
      itemsPurchased: ['Custom Upgrade'],
      enabled: true
    };

    setLocalReviews([newReview, ...localReviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewForm(false);
      setName('');
      setCar('');
      setText('');
      setRating(5);
    }, 2000);
  };

  const avgRating = allReviews.length > 0 
    ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
    : '4.9';

  return (
    <section id="reviews" className="py-20 bg-[#0A1224] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Verified Car Owners</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What Drivers Say About <span className="text-gold-gradient">{business.name}</span>
            </h2>
            <div className="flex items-center space-x-2 mt-2 text-sm text-slate-300">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">{avgRating} / 5.0 Rating</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Over 1,850+ Customer Builds</span>
            </div>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all cursor-pointer self-start md:self-auto"
          >
            <Star className="w-4 h-4" />
            <span>{showReviewForm ? 'Cancel Review' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Interactive Add Review Form */}
        {showReviewForm && (
          <div className="navy-card rounded-2xl p-6 sm:p-8 border border-amber-500/30 mb-12 animate-in fade-in slide-in-from-top-4">
            <h3 className="text-lg font-bold text-white mb-4">Share Your Experience with {business.name}</h3>
            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Thank you! Your verified review has been submitted.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikramaditya R."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs border border-slate-700 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Vehicle Make & Model</label>
                    <input
                      type="text"
                      value={car}
                      onChange={(e) => setCar(e.target.value)}
                      placeholder="e.g. Fortuner / Thar / Seltos"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs border border-slate-700 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Rating</label>
                    <div className="flex items-center space-x-2 pt-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 text-amber-400 focus:outline-none cursor-pointer"
                        >
                          <Star className={`w-5 h-5 ${star <= rating ? 'fill-amber-400' : 'text-slate-600'}`} />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-amber-400 ml-2">{rating}.0 / 5.0</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Review Comments *</label>
                  <textarea
                    required
                    rows={3}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tell us about the fitment quality, illumination, sound performance, or customer service..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs border border-slate-700 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs flex items-center space-x-2 hover:scale-105 transition-transform cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Review</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allReviews.map((review) => (
            <div
              key={review.id}
              className="navy-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-md">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{review.name}</h4>
                      <div className="text-xs text-amber-400 font-semibold flex items-center space-x-1">
                        <Car className="w-3 h-3 text-slate-400" />
                        <span>{review.car}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500">{review.date}</span>
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                <div className="flex items-center space-x-1 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Purchase & Fitment</span>
                </div>
                {review.itemsPurchased && (
                  <div className="text-slate-400">
                    Upgrades: <span className="text-slate-200">{review.itemsPurchased.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

