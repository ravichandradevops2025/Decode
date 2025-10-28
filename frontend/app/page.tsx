'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, Briefcase, TrendingUp, Zap, Target, BookOpen } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Next-Gen Learning Platform</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
                Learn. Build. Earn.
              </span>
              <br />
              <span className="text-slate-900">Get Referred.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Bridge the gap between learning and corporate readiness with hands-on projects, 
              collaborative environments, and direct pathways to top companies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link href="/auth/signup">
                <button className="group px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                  Start Learning Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="#features">
                <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold text-lg border-2 border-slate-200 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                  Explore Features
                </button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto"
            >
              {[
                { label: 'Active Learners', value: '10K+', icon: Users },
                { label: 'Courses', value: '150+', icon: BookOpen },
                { label: 'Partner Companies', value: '50+', icon: Briefcase },
                { label: 'Success Rate', value: '94%', icon: TrendingUp }
              ].map((stat) => (
                <div key={stat.label} className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-2">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Target className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Why Decode?</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Everything You Need to <span className="text-primary">Succeed</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 max-w-2xl mx-auto">
              From practical learning to corporate referrals, we've built a complete ecosystem for your career growth.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Feature Card 1 - Practical Learning */}
            <motion.div variants={fadeInUp} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 bg-white rounded-2xl border border-slate-200 hover:border-primary/30 transition-all duration-300 hover:shadow-xl h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Practical Learning</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Industry-grade courses with hands-on projects. Earn points, redeem rewards, and climb leaderboards while you learn.
                </p>
                <ul className="space-y-2">
                  {['Structured courses', 'Real projects', 'Reward system', 'Leaderboards'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Feature Card 2 - Decode Room */}
            <motion.div variants={fadeInUp} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 bg-white rounded-2xl border border-slate-200 hover:border-accent/30 transition-all duration-300 hover:shadow-xl h-full">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Decode Room</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Corporate simulation projects with real team dynamics. Work with developers, testers, and designers just like in real companies.
                </p>
                <ul className="space-y-2">
                  {['Team collaboration', 'Daily stand-ups', 'Sprint planning', 'Real experience'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Feature Card 3 - Referral System */}
            <motion.div variants={fadeInUp} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 bg-white rounded-2xl border border-slate-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl h-full">
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Smart Referrals</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Get referred to top companies by professionals. Pre-assessed candidates meet verified referrers for win-win-win outcomes.
                </p>
                <ul className="space-y-2">
                  {['Skill passport', 'Company matches', 'Referral rewards', 'Direct hiring'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Your Journey to <span className="text-primary">Success</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 max-w-2xl mx-auto">
              Four simple steps from learner to employed professional
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              { step: '01', title: 'Learn', description: 'Complete practical courses and earn points', color: 'bg-primary/10 text-primary border-primary/20' },
              { step: '02', title: 'Build', description: 'Join Decode Rooms and work on real projects', color: 'bg-accent/10 text-accent border-accent/20' },
              { step: '03', title: 'Showcase', description: 'Build your Skill Passport with achievements', color: 'bg-purple-100 text-purple-600 border-purple-200' },
              { step: '04', title: 'Get Hired', description: 'Receive referrals to top companies', color: 'bg-pink-100 text-pink-600 border-pink-200' }
            ].map((item, index) => (
              <motion.div key={item.step} variants={fadeInUp} className="relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-300 to-transparent" />
                )}
                <div className="text-center space-y-4">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl ${item.color} border`}>
                    <span className="text-3xl font-bold">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary via-purple-600 to-accent">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <Award className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Join 10,000+ Learners</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to Transform Your Career?
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Start your journey today. Learn practical skills, build real projects, and get referred to your dream company.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/auth/signup">
              <button className="group px-8 py-4 bg-white text-primary rounded-xl font-semibold text-lg hover:bg-slate-50 transition-all duration-300 hover:scale-105 shadow-xl flex items-center gap-2">
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/courses">
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
                Browse Courses
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
