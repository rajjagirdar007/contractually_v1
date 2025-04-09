// app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { toast } from "sonner"; // <--- Import toast from Sonner
import { CheckCircle, AlertTriangle, Zap, Lock, Menu, X, FileText, Search, Clock, ShieldCheck, Users, MessageSquareQuote, Award, ChevronRight } from 'lucide-react';

// --- Data for Sections (remains the same) ---
const benefits = [
  // ... (keep benefit data)
    {
    icon: <CheckCircle className="h-10 w-10 text-primary mb-4" />,
    title: "Instant Clarity",
    description: "Transform dense legal jargon into plain English summaries. Understand key points and obligations in seconds.",
  },
  {
    icon: <AlertTriangle className="h-10 w-10 text-destructive mb-4" />,
    title: "Identify Hidden Risks",
    description: "Automatically flags concerning clauses like auto-renewals, data sharing, and hidden fees with clear risk indicators.",
  },
  {
    icon: <Zap className="h-10 w-10 text-yellow-500 mb-4" />,
    title: "Save Review Time",
    description: "Stop wading through pages of legalese. Get the crucial information you need in minutes, not hours.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-green-600 mb-4" />,
    title: "Sign with Confidence",
    description: "Know exactly what you're agreeing to. Make informed decisions and avoid costly surprises.",
  },
];

const features = [
 // ... (keep feature data)
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Upload or Paste",
    description: "Analyze contracts from documents, pasted text, or even website URLs via our browser extension.",
  },
 {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: "AI-Powered Analysis",
    description: "Our intelligent engine reads and interprets legal language, identifying key terms and potential issues.",
  },
 {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Layered Summaries",
    description: "Get quick insights with 30-second overviews or dive deeper with categorized 2-minute summaries.",
  },
 {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Personalized Focus",
    description: "Tell ContrActually what matters most to you (privacy, fees, cancellation) for tailored risk scoring.",
  },
]

const faqItems = [
  // ... (keep faq data)
   {
    value: "item-1",
    question: "What types of contracts can ContrActually analyze?",
    answer: "Virtually any text-based legal document: Terms of Service, Privacy Policies, NDAs, employment contracts, rental agreements, software licenses, vendor agreements, and more. If you can copy or upload it, we can likely analyze it.",
  },
  {
    value: "item-2",
    question: "How secure is my data and uploaded documents?",
    answer: "Security is paramount. We use industry-standard encryption (both in transit and at rest). Uploaded documents are processed securely and are not stored long-term unless you explicitly save them to your account (a future feature). We are committed to GDPR and CCPA compliance.",
  },
  {
    value: "item-3",
    question: "Is this a replacement for a lawyer?",
    answer: "No. ContrActually is a powerful *first-pass* analysis tool designed to provide clarity and identify potential risks quickly. It empowers you to understand agreements better and ask more informed questions. For complex situations or legally binding advice, always consult with a qualified legal professional.",
  },
   {
    value: "item-4",
    question: "How does the AI work? Is it accurate?",
    answer: "We utilize advanced Natural Language Processing (NLP) models specifically trained on legal text. While we strive for high accuracy in identifying common clauses and risks, AI is not infallible. It's designed to augment human review, not replace critical thinking.",
  },
];

const testimonials = [
 // ... (keep testimonial data)
   {
    quote: "ContrActually saved me hours reviewing a complex SaaS agreement. It instantly highlighted a problematic auto-renewal clause I might have missed. Indispensable for any small business owner.",
    author: "Alex Chen",
    title: "Founder, Tech Startup",
    avatar: "/placeholder-avatar-1.png", // Replace with actual path or remove
  },
 {
    quote: "As someone who cares deeply about privacy, wading through privacy policies was a nightmare. ContrActually gives me a clear, concise breakdown of data usage in minutes. Finally, peace of mind!",
    author: "Sarah Miller",
    title: "Privacy Advocate",
    avatar: "/placeholder-avatar-2.png", // Replace with actual path or remove
  },
];


// --- The Page Component ---

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // No need for `useToast` hook anymore

  // Smooth scroll handler (remains the same)
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !name) {
      // Use Sonner toast.error for validation
      toast.error("Missing Information", {
        description: "Please enter both your name and email address.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Send form data to Formspree
      const response = await fetch("https://formspree.io/f/mvgkdakn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Handle success
      setIsSubmitted(true);
      toast.success("🎉 You're In!", {
        description: "Thanks for joining the waitlist. We'll be in touch soon.",
      });
      
      // Optional: Clear form fields
      setEmail('');
      setName('');
      
    } catch (error) {
      console.error('Error:', error);
      toast.error("Submission Failed", {
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Mobile Nav state (remains the same)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  // --- JSX Structure (remains largely the same, only form submission feedback changes) ---
  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* --- Header (remains the same) --- */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="container mx-auto max-w-7xl px-4 md:px-6">
    <div className="flex h-16 items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mr-6" onClick={(e) => handleScroll(e, 'hero')}>
        <Image src="/logo.svg" alt="ContrActually Logo" width={32} height={32} />
        <span className="font-bold text-lg text-foreground">ContrActually</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link href="#features" onClick={(e) => handleScroll(e, 'features')} className="text-muted-foreground transition-colors hover:text-foreground">
          Features
        </Link>
        <Link href="#how-it-works" onClick={(e) => handleScroll(e, 'how-it-works')} className="text-muted-foreground transition-colors hover:text-foreground">
          How It Works
        </Link>
        <Link href="#faq" onClick={(e) => handleScroll(e, 'faq')} className="text-muted-foreground transition-colors hover:text-foreground">
          FAQ
        </Link>
        <Button asChild size="sm" onClick={(e) => handleScroll(e as any, 'waitlist')}>
          <Link href="#waitlist">Join Waitlist</Link>
        </Button>
      </nav>

      {/* Mobile Navigation Trigger */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader className="mb-6">
            <SheetTitle>
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src="/logo.svg" alt="ContrActually Logo" width={24} height={24} />
                <span className="font-bold text-lg text-foreground">ContrActually</span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4">
            <SheetClose asChild>
              <Link href="#features" onClick={(e) => { handleScroll(e, 'features'); setIsMobileMenuOpen(false); }} className="text-muted-foreground transition-colors hover:text-foreground text-lg py-2">
                Features
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="#how-it-works" onClick={(e) => { handleScroll(e, 'how-it-works'); setIsMobileMenuOpen(false); }} className="text-muted-foreground transition-colors hover:text-foreground text-lg py-2">
                How It Works
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="#faq" onClick={(e) => { handleScroll(e, 'faq'); setIsMobileMenuOpen(false); }} className="text-muted-foreground transition-colors hover:text-foreground text-lg py-2">
                FAQ
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Button asChild size="lg" className="mt-4" onClick={(e) => { handleScroll(e as any, 'waitlist'); setIsMobileMenuOpen(false); }}>
                <Link href="#waitlist">Join Waitlist Now</Link>
              </Button>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</header>

      {/* --- Main Content (remains the same structure) --- */}
      <main className="flex-grow">
         {/* --- Hero Section (remains the same) --- */}
         <section id="hero" className="relative pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-32 lg:pb-40 overflow-hidden bg-gradient-to-b from-background to-secondary/30">
          {/* Main container with max width and auto margins for centering */}
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
                  Stop Signing Blindly. <br />
                  <span className="text-primary">Understand Contracts</span> Instantly.
                </h1>
                <p className="max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground md:text-xl mb-10">
                  ContrActually uses AI to decode complex terms & conditions and legal agreements. Get clear summaries, identify hidden risks, and save hours of review time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="text-lg px-8 py-7" asChild onClick={(e) => handleScroll(e as any, 'waitlist')}>
                    <Link href="#waitlist">Get Early Access</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-7" asChild onClick={(e) => handleScroll(e as any, 'features')}>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
                <p className="mt-4 text-sm text-muted-foreground text-center lg:text-left">Join thousands securing their spot.</p>
              </div>
              <div className="flex justify-end ml-auto">
  <div className="relative w-full max-w-md transform transition-all duration-500 hover:translate-y-1 hover:shadow-xl">
    {/* Decorative elements */}
    <div className="absolute -top-2 -right-2 w-20 h-20 bg-primary/5 rounded-full blur-xl"></div>
    <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
    
    {/* Main Card */}
    <Card className="relative border border-border/60 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-background/95">
      {/* Card Header */}
      <CardHeader className="bg-gradient-to-r from-background to-muted/30 p-4 border-b">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-md">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <span>AI Contract Analysis</span>
        </CardTitle>
      </CardHeader>
      
      {/* Card Content */}
      <CardContent className="p-6 space-y-5">
        {/* Summary Section */}
        <div className="space-y-2 bg-muted/10 p-3 rounded-lg border border-border/40">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium text-muted-foreground">Summary</Label>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-destructive/10 text-destructive">High Risk</span>
          </div>
          <p className="text-sm">Key points: 3-year term, auto-renews yearly, data shared with affiliates.</p>
        </div>
        
        {/* Cancellation Section */}
        <div className="space-y-2 bg-muted/10 p-3 rounded-lg border border-border/40">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium text-muted-foreground">Cancellation</Label>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/10 text-yellow-600">Medium Risk</span>
          </div>
          <p className="text-sm">Requires 90-day notice before renewal, penalty applies.</p>
        </div>
        
        {/* Data Privacy Section */}
        <div className="space-y-2 bg-muted/10 p-3 rounded-lg border border-border/40">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium text-muted-foreground">Data Privacy</Label>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-600">Low Risk</span>
          </div>
          <p className="text-sm">Compliant with standard regulations.</p>
        </div>
        
        {/* Button */}
        <div className="pt-2">
          <Button size="sm" className="w-full bg-primary hover:bg-primary/90 transition-colors" disabled>
            <span>Full Report (Example)</span>
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</div>
            </div>
          </div>
        </section>

        {/* --- Social Proof Section (remains the same) --- */}
        <section className="py-12 bg-muted/40 border-y">
          {/* ... social proof content ... */}
           <div className=" px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 text-center">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Trusted by early users from
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 lg:gap-12 filter grayscale opacity-70">
                 {/* Replace with actual SVG logos or Image components */}
                 <span className="font-semibold text-muted-foreground">Major Tech</span>
                 <span className="font-semibold text-muted-foreground">Leading SaaS</span>
                 <span className="font-semibold text-muted-foreground">Top Agencies</span>
                 <span className="font-semibold text-muted-foreground">Universities</span>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="py-16 md:py-24 lg:py-32">
  <div className="container mx-auto max-w-7xl px-4 md:px-6">
    <div className="max-w-xl mx-auto text-center mb-12 md:mb-16">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Why You'll Love ContrActually</h2>
      <p className="text-lg text-muted-foreground">
        Go beyond simple summaries. Gain true understanding and control over your agreements.
      </p>
    </div>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {benefits.map((benefit, index) => (
        <div key={index} className="border rounded-lg p-8 flex flex-col items-center text-center h-full transition-all hover:border-primary/20 hover:shadow-sm">
          <div className="mb-6 h-12 w-12 flex items-center justify-center">
            {/* Icon with appropriate color based on the index */}
            <div className={`text-3xl ${
              index === 0 ? "text-gray-800" : 
              index === 1 ? "text-red-500" : 
              index === 2 ? "text-amber-400" : 
              "text-green-600"
            }`}>
              {benefit.icon}
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4">
            {/* Split title into two lines if it contains a space */}
            {benefit.title.includes(" ") ? (
              <>
                {benefit.title.split(" ")[0]}<br />
                {benefit.title.split(" ").slice(1).join(" ")}
              </>
            ) : benefit.title}
          </h3>
          <p className="text-muted-foreground text-sm">
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* --- Features Section (remains the same) --- */}
        <section id="features" className="py-16 md:py-24 lg:py-32 bg-secondary/30">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-xl mx-auto text-center mb-12 md:mb-16">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-3">
              Core Features
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">How ContrActually Works For You</h2>
            <p className="text-lg text-muted-foreground">
              Simple inputs, powerful insights. Our streamlined process gets you answers fast.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="border bg-background rounded-lg p-6 hover:border-primary/20 hover:shadow-sm transition-all h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-primary shrink-0 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* --- How It Works (Simplified Visual) (remains the same) --- */}
        <section id="how-it-works" className="py-16 md:py-24">
            {/* ... how it works content ... */}
              <div className=" px-4 md:px-6">
               <div className="max-w-xl mx-auto text-center mb-12 md:mb-16">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Get Clarity in 3 Simple Steps</h2>
               </div>
               <div className="relative max-w-4xl mx-auto">
                 {/* Connecting line */}
                 <div className="absolute left-1/2 top-6 bottom-6 w-0.5 bg-border -translate-x-1/2 hidden md:block" aria-hidden="true"></div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
                   {/* Steps 1, 2, 3 */}
                     <div className="relative text-center md:text-left">
                     <div className="flex justify-center md:justify-start items-center mb-4">
                       <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mr-4">1</div>
                       <FileText className="w-8 h-8 text-primary hidden md:inline-block" />
                     </div>
                     <h3 className="text-lg font-semibold mb-2">Submit Your Document</h3>
                     <p className="text-sm text-muted-foreground">Upload a file, paste text, or use our browser extension to grab T&Cs directly from websites.</p>
                   </div>
                   <div className="relative text-center">
                     <div className="flex justify-center items-center mb-4">
                       <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mr-4">2</div>
                       <Search className="w-8 h-8 text-primary hidden md:inline-block" />
                     </div>
                     <h3 className="text-lg font-semibold mb-2">AI Analyzes Instantly</h3>
                     <p className="text-sm text-muted-foreground">Our engine reads the document, identifies key clauses, and assesses potential risks based on common patterns.</p>
                   </div>
                    <div className="relative text-center md:text-right">
                      <div className="flex justify-center md:justify-end items-center mb-4">
                       <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mr-4 md:mr-0 md:ml-4 order-1 md:order-2">3</div>
                       <CheckCircle className="w-8 h-8 text-primary hidden md:inline-block order-2 md:order-1" />
                      </div>
                     <h3 className="text-lg font-semibold mb-2">Receive Clear Insights</h3>
                     <p className="text-sm text-muted-foreground">Get easy-to-understand summaries, visual risk indicators, and highlights of important sections.</p>
                   </div>
                 </div>
               </div>
             </div>
        </section>

        {/* --- Testimonials Section (remains the same) --- */}
        <section id="testimonials" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5 border-y">
          {/* ... testimonials content ... */}
           <div className=" px-4 md:px-6">
             <div className="max-w-xl mx-auto text-center mb-12 md:mb-16">
               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Don't Just Take Our Word For It</h2>
                <p className="text-lg text-muted-foreground">
                 See how ContrActually is already making a difference for early users.
                </p>
             </div>
             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                 <Card key={index} className="bg-background shadow-lg">
                   <CardContent className="p-6 flex flex-col items-center text-center">
                      <MessageSquareQuote className="w-8 h-8 text-primary mb-4" />
                     <p className="text-base italic text-foreground mb-6">"{testimonial.quote}"</p>
                     <div className="flex items-center gap-3 mt-auto">
                        <Avatar>
                          {/* <AvatarImage src={testimonial.avatar} alt={testimonial.author} /> */}
                          <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                       <div>
                         <p className="font-semibold text-sm">{testimonial.author}</p>
                         <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               ))}
             </div>
           </div>
        </section>

        {/* --- FAQ Section (remains the same) --- */}
        <section id="faq" className="py-16 md:py-24">
           {/* ... faq content ... */}
           <div className=" px-4 md:px-6 max-w-3xl mx-auto">
             <div className="text-center mb-12 md:mb-16">
               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Frequently Asked Questions</h2>
             </div>
             <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item) => (
                 <AccordionItem key={item.value} value={item.value}>
                   <AccordionTrigger className="text-lg text-left hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                   <AccordionContent className="text-base text-muted-foreground pt-2 pb-4">
                      {item.answer}
                    </AccordionContent>
                 </AccordionItem>
               ))}
             </Accordion>
           </div>
        </section>

        {/* --- Waitlist Signup Section (remains the same structure) --- */}
         <section id="waitlist" className="py-16 md:py-24 lg:py-32 bg-gradient-to-t from-background via-secondary/50 to-secondary/30">
          <div className=" px-4 md:px-6">
            <Card className="max-w-2xl mx-auto shadow-xl overflow-hidden">
              <CardHeader className="p-6 md:p-10 text-center bg-muted/30">
                 <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                 <CardTitle className="text-3xl font-bold tracking-tight md:text-4xl">Be Among the First</CardTitle>
                <CardDescription className="text-lg text-muted-foreground mt-3 max-w-md mx-auto">
                  Join the ContrActually waitlist for exclusive early access, founder pricing, and updates.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-10">
                 {isSubmitted ? (
                   <div className="text-center py-8">
                     <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                     <h3 className="text-2xl font-semibold mb-2">Success! You're on the list.</h3>
                     <p className="text-muted-foreground">Thank you for joining! We'll email you soon with your exclusive access details.</p>
                     {/* Note: The success toast now appears from the handleWaitlistSubmit function */}
                   </div>
                 ) : (
                    <form onSubmit={handleWaitlistSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          disabled={isLoading}
                          className="h-12 text-base"
                        />
                      </div>
                     <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          className="h-12 text-base"
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full h-14 text-lg" disabled={isLoading}>
                         {isLoading ? "Submitting..." : "Secure My Spot"}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center pt-2">
                         We respect your privacy. No spam, ever. Read our <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                      </p>
                    </form>
                 )}
              </CardContent>
            </Card>
          </div>
        </section>

      </main>

      {/* --- Footer (remains the same) --- */}
      <footer className="py-8 bg-muted border-t">
        {/* ... footer content ... */}
         <div className=" px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-2">
             <Image src="/logo.svg" alt="ContrActually Logo" width={20} height={20} />
             <span className="text-muted-foreground">© {new Date().getFullYear()} ContrActually. All rights reserved.</span>
           </div>
          <nav className="flex gap-4 md:gap-6">
            {/* Add actual links later */}
             <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </nav>
        </div>
      </footer>

    </div>
  );
}