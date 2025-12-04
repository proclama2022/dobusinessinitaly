import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import OptimizedImage from '@/components/OptimizedImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faShareAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedinIn,
  faTiktok,
  faYoutube,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactSection = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();

  // Define the form schema
  const contactFormSchema = z.object({
    name: z.string().min(1, { message: t('contact.form.validation.nameRequired') }),
    company: z.string().optional(),
    email: z.string().email({ message: t('contact.form.validation.emailInvalid') }),
    phone: z.string().optional(),
    service: z.string().min(1, { message: t('contact.form.validation.serviceRequired') }),
    message: z.string().min(10, { message: t('contact.form.validation.messageLength') }),
    privacy: z.boolean().refine(val => val === true, {
      message: t('contact.form.validation.privacyRequired'),
    }),
  });

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      privacy: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof contactFormSchema>) => {
      const { privacy, ...contactData } = values;
      return await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    },
    onSuccess: (data) => {
      toast({
        title: t('contact.success.title'),
        description: t('contact.success.message'),
        variant: 'default',
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t('contact.error.title'),
        description: error instanceof Error ? error.message : t('contact.error.message'),
        variant: 'destructive',
      });
    }
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    try {
      await mutate(values);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: t('contact.error.title'),
        description: t('contact.error.message'),
        variant: 'destructive',
      });
    }
  };

  return (
    <section id="contact" className="section-padding bg-white relative overflow-hidden">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in relative">
          <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">Contact Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Get in Touch
          </h2>
          
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white p-10 rounded shadow-lg border border-neutral-100 relative overflow-hidden">
              
              <h3 className="text-3xl font-bold text-neutral-900 mb-6">
                {t('contact.form.title')}
              </h3>
              
              {/* Badge per consulenza gratuita */}
              <div className="mb-8 flex flex-wrap gap-3">
                <div className="px-4 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide rounded-full border border-primary/20">
                  FREE 30min Consultation
                </div>
                <div className="px-4 py-1 bg-neutral-100 text-neutral-600 text-xs font-bold uppercase tracking-wide rounded-full border border-neutral-200">
                  48h Response Time
                </div>
              </div>
              
                  <Form {...form} key={i18n.language}>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)();
                }} className="space-y-6 relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                            {t('contact.form.name')} <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              className="border-0 border-b border-neutral-300 rounded-none px-0 focus:ring-0 focus:border-primary placeholder-neutral-300 text-lg bg-transparent transition-colors duration-300" 
                              placeholder="John Doe"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs font-medium" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                            {t('contact.form.company')}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              className="border-0 border-b border-neutral-300 rounded-none px-0 focus:ring-0 focus:border-primary placeholder-neutral-300 text-lg bg-transparent transition-colors duration-300" 
                              placeholder="Your Company"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs font-medium" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                            {t('contact.form.email')} <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              className="border-0 border-b border-neutral-300 rounded-none px-0 focus:ring-0 focus:border-primary placeholder-neutral-300 text-lg bg-transparent transition-colors duration-300" 
                              type="email" 
                              placeholder="your@email.com"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs font-medium" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                            {t('contact.form.phone')}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              className="border-0 border-b border-neutral-300 rounded-none px-0 focus:ring-0 focus:border-primary placeholder-neutral-300 text-lg bg-transparent transition-colors duration-300" 
                              type="tel" 
                              placeholder="+1 234 567 890"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs font-medium" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                          {t('contact.form.service')} <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-0 border-b border-neutral-300 rounded-none px-0 focus:ring-0 focus:border-primary text-lg bg-transparent shadow-none">
                              <SelectValue placeholder={t('contact.form.selectServicePlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="company_formation">{t('services.items.formation.title')}</SelectItem>
                            <SelectItem value="accounting">{t('services.items.accounting.title')}</SelectItem>
                            <SelectItem value="tax_consulting">{t('services.items.tax.title')}</SelectItem>
                            <SelectItem value="business_planning">{t('services.items.planning.title')}</SelectItem>
                            <SelectItem value="payroll_hr">{t('services.items.payroll.title')}</SelectItem>
                            <SelectItem value="legal_support">{t('services.items.legal.title')}</SelectItem>
                            <SelectItem value="private_clients">{t('services.items.private_clients.title')}</SelectItem>
                            <SelectItem value="freelancer">{t('services.items.freelancer.title')}</SelectItem>
                            <SelectItem value="relocation">{t('services.items.relocation.title')}</SelectItem>
                            <SelectItem value="facilitated_finance">{t('services.items.facilitated_finance.title')}</SelectItem>
                            <SelectItem value="agriculture">{t('services.items.agriculture.title')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-destructive text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                          {t('contact.form.message')} <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            className="border-0 border-b border-neutral-300 rounded-none px-0 focus:ring-0 focus:border-primary placeholder-neutral-300 text-lg bg-transparent shadow-none min-h-[100px] resize-y" 
                            rows={4} 
                            placeholder="How can we help you?"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="privacy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-neutral-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-neutral-500 font-normal">
                            {t('contact.form.privacyConsent')} <a href="#" className="text-primary hover:underline font-medium">{t('contact.form.privacyPolicy')}</a>.
                          </FormLabel>
                          <FormMessage className="text-destructive text-xs font-medium" />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-6">
                    <button
                      type="submit"
                      className="btn-primary w-full sm:w-auto"
                      disabled={isPending}
                    >
                      <span className="relative flex items-center justify-center gap-2">
                        {isPending ? t('contact.form.sending') : t('contact.form.send')}
                        <FontAwesomeIcon icon={faPaperPlane} className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          
          <div className="animate-slide-up h-full" style={{ animationDelay: '0.4s' }}>
            <div className="bg-neutral-50 p-10 rounded h-full border border-neutral-200 relative overflow-hidden">
              {/* Image */}
              <div className="mb-10 overflow-hidden rounded shadow-lg group relative h-64">
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1280&q=80" 
                  alt={t('contact.info.officeImageAlt')}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={1280}
                  height={384}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 text-white">
                   <p className="font-bold text-sm uppercase tracking-widest mb-1">Headquarters</p>
                   <p className="text-2xl font-bold">Milan, Italy</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                  {t('contact.info.title')}
                </h3>
                
                <div className="space-y-8">
                  <div className="flex items-start group">
                    <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-lg" />
                    </div>
                    <div className="ml-6">
                      <h4 className="font-bold text-sm uppercase tracking-wide text-neutral-900 mb-2">{t('contact.info.address.label')}</h4>
                      <p className="text-neutral-600 text-lg leading-relaxed">{t('contact.info.address.value')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0">
                      <FontAwesomeIcon icon={faPhoneAlt} className="text-lg" />
                    </div>
                    <div className="ml-6">
                      <h4 className="font-bold text-sm uppercase tracking-wide text-neutral-900 mb-2">{t('contact.info.phone.label')}</h4>
                      <p className="text-neutral-600 text-lg">
                        <a href="tel:+39095643533" className="hover:text-primary transition-colors">
                          {t('contact.info.phone.value')}
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0">
                      <FontAwesomeIcon icon={faEnvelope} className="text-lg" />
                    </div>
                    <div className="ml-6">
                      <h4 className="font-bold text-sm uppercase tracking-wide text-neutral-900 mb-2">{t('contact.info.email.label')}</h4>
                      <p className="text-neutral-600 text-lg">
                        <a href="mailto:amministrazione@proclama.co" className="hover:text-primary transition-colors break-all">
                          {t('contact.info.email.value')}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-neutral-200">
                <h3 className="font-bold text-sm uppercase tracking-wide text-neutral-500 mb-4 flex items-center">
                  <FontAwesomeIcon icon={faShareAlt} className="mr-2" />
                  {t('contact.info.social')}
                </h3>
                
                <div className="flex space-x-4">
                  {[
                    { icon: faLinkedinIn, url: "https://www.linkedin.com/company/partitaiva", color: "hover:bg-[#0077B5]" },
                    { icon: faTiktok, url: "https://www.tiktok.com/@partitaiva.it", color: "hover:bg-black" },
                    { icon: faYoutube, url: "https://www.youtube.com/channel/UCggYXro7p7chs4MvrMcLSvg", color: "hover:bg-[#FF0000]" },
                    { icon: faInstagram, url: "https://www.instagram.com/partitaiva.it/", color: "hover:bg-[#E1306C]" }
                  ].map((social, idx) => (
                    <a 
                      key={idx}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`w-10 h-10 rounded-full bg-white border border-neutral-200 text-neutral-600 flex items-center justify-center ${social.color} hover:text-white transition-all duration-300 hover:border-transparent shadow-sm hover:shadow-md`}
                    >
                      <FontAwesomeIcon icon={social.icon} className="text-sm" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
