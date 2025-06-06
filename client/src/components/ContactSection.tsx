import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

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
    <section id="contact" className="py-16 bg-white relative overflow-hidden">
      {/* Elementi decorativi con la bandiera italiana */}
      <div className="absolute top-0 inset-x-0 h-2 italian-gradient"></div>
      <div className="absolute bottom-0 inset-x-0 h-2 italian-gradient"></div>
      <div className="absolute top-0 left-0 w-2 h-full bg-[#009246]"></div>
      <div className="absolute top-0 right-0 w-2 h-full bg-[#ce2b37]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in relative">
          {/* Decorazioni */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#009246] opacity-30 rounded-full"></div>
          <div className="absolute -top-10 left-1/3 w-32 h-32 bg-[#00924615] rounded-full filter blur-xl animate-pulse opacity-30"></div>
          <div className="absolute -top-10 right-1/3 w-32 h-32 bg-[#ce2b3715] rounded-full filter blur-xl animate-pulse opacity-30" style={{ animationDuration: '7s' }}></div>
          
          {/* Titolo */}
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 relative inline-flex">
            <span className="text-[#009246]">Get in </span>
            <span className="relative pl-2">
              Touch
              <span className="absolute -bottom-2 left-0 right-0 h-1 italian-gradient"></span>
            </span>
          </h2>
          
          <p className="text-neutral-700 max-w-2xl mx-auto text-lg font-light">
            {t('contact.subtitle')}
          </p>
          
          {/* Badge decorativo */}
          <div className="max-w-xs mx-auto mt-8 mb-4 flex items-center justify-center">
            <span className="h-px w-12 bg-neutral-200"></span>
            <div className="mx-4 px-4 py-1 rounded-full border border-neutral-200 text-xs text-neutral-500 font-medium">
              {t('contact.contactInfo')} 
            </div>
            <span className="h-px w-12 bg-neutral-200"></span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="shadow-xl rounded-lg p-8 bg-white border border-neutral-100 relative overflow-hidden">
              {/* Accenti decorativi */}
              <div className="absolute top-0 left-0 w-1 h-8 bg-[#009246]"></div>
              <div className="absolute top-0 right-0 w-1 h-8 bg-[#ce2b37]"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00924608] rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ce2b3708] rounded-full"></div>
              
              <h3 className="text-2xl font-heading font-semibold mb-4 relative inline-block">
                <span className="relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-[#009246]">
                  {t('contact.form.title')}
                </span>
              </h3>
              
              {/* Badge per consulenza gratuita */}
              <div className="mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-2 lg:gap-3">
                <div className="flex items-center gap-2 bg-gradient-to-r from-[#009246] to-[#00b157] text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium shadow-md">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  FREE 30min
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium shadow-md">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                  48-72h Response
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium shadow-md">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  English Call
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
                        <FormItem className="transition-all duration-300 group">
                          <FormLabel className="text-neutral-700 group-focus-within:text-primary transition-colors duration-300">
                            {t('contact.form.name')} <span className="text-[#ce2b37]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              className="border-neutral-200 focus:border-primary shadow-sm rounded-md" 
                              placeholder="John Doe"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-[#ce2b37] text-xs font-medium" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem className="transition-all duration-300 group">
                          <FormLabel className="text-neutral-700 group-focus-within:text-primary transition-colors duration-300">
                            {t('contact.form.company')}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              className="border-neutral-200 focus:border-primary shadow-sm rounded-md" 
                              placeholder="Your Company"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-[#ce2b37] text-xs font-medium" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="transition-all duration-300 group">
                          <FormLabel className="text-neutral-700 group-focus-within:text-primary transition-colors duration-300">
                            {t('contact.form.email')} <span className="text-[#ce2b37]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              className="border-neutral-200 focus:border-primary shadow-sm rounded-md" 
                              type="email" 
                              placeholder="your.email@example.com"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-[#ce2b37] text-xs font-medium" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="transition-all duration-300 group">
                          <FormLabel className="text-neutral-700 group-focus-within:text-primary transition-colors duration-300">
                            {t('contact.form.phone')}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              className="border-neutral-200 focus:border-primary shadow-sm rounded-md" 
                              type="tel" 
                              placeholder="+1 (234) 567-8910"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-[#ce2b37] text-xs font-medium" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem className="transition-all duration-300 group">
                        <FormLabel className="text-neutral-700 group-focus-within:text-primary transition-colors duration-300">
                          {t('contact.form.service')} <span className="text-[#ce2b37]" >*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-neutral-200 focus:border-primary shadow-sm rounded-md">
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
                        <FormMessage className="text-[#ce2b37] text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="transition-all duration-300 group">
                        <FormLabel className="text-neutral-700 group-focus-within:text-primary transition-colors duration-300">
                          {t('contact.form.message')} <span className="text-[#ce2b37]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            className="border-neutral-200 focus:border-primary shadow-sm rounded-md min-h-[120px]" 
                            rows={5} 
                            placeholder="How can we help you? Please provide details about your request..."
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-[#ce2b37] text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="privacy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-neutral-50 rounded-md border border-neutral-100">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-neutral-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-neutral-600 font-normal">
                            {t('contact.form.privacyConsent')} <a href="#" className="text-primary font-medium hover:text-[#ce2b37] transition-colors underline">{t('contact.form.privacyPolicy')}</a>.
                          </FormLabel>
                          <FormMessage className="text-[#ce2b37] text-xs font-medium" />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      className="relative overflow-hidden group px-8 py-3.5 rounded-md bg-[#009246] text-white font-medium shadow-md hover:shadow-lg transition duration-300 disabled:opacity-70"
                      disabled={isPending}
                    >
                      <span className="absolute inset-0 w-0 bg-[#ce2b37] transition-all duration-300 ease-out group-hover:w-full"></span>
                      <span className="relative flex items-center justify-center gap-2">
                        {isPending ? t('contact.form.sending') : t('contact.form.send')}
                        <i className="fas fa-paper-plane text-sm group-hover:translate-x-1 transition-transform duration-300"></i>
                      </span>
                    </button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white p-8 rounded-lg h-full shadow-xl border border-neutral-100 relative overflow-hidden">
              {/* Accenti decorativi */}
              <div className="absolute top-0 left-0 w-1 h-8 bg-[#ce2b37]"></div>
              <div className="absolute top-0 right-0 w-1 h-8 bg-[#009246]"></div>
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#00924608] rounded-full"></div>
              
              {/* Immagine dell'ufficio in posizione superiore */}
              <div className="mb-8 overflow-hidden rounded-lg shadow-md group relative">
                <img 
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt={t('contact.info.officeImageAlt')}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{t('contact.info.address.value')}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-heading font-semibold mb-6 relative inline-block">
                  <span className="relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-[#ce2b37]">
                    {t('contact.info.title')}
                  </span>
                </h3>
                
                <div className="space-y-5">
                  <div className="flex items-start p-4 rounded-md transition-all duration-300 hover:bg-neutral-50 group">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#00924615] flex items-center justify-center transition-all duration-300 group-hover:bg-[#009246] group-hover:text-white">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-neutral-800">{t('contact.info.address.label')}</h4>
                      <p className="text-neutral-600 mt-1">{t('contact.info.address.value')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 rounded-md transition-all duration-300 hover:bg-neutral-50 group">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#00924615] flex items-center justify-center transition-all duration-300 group-hover:bg-[#009246] group-hover:text-white">
                        <i className="fas fa-phone-alt"></i>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-neutral-800">{t('contact.info.phone.label')}</h4>
                      <p className="text-neutral-600 mt-1">
                        <a href="tel:+39095643533" className="hover:text-[#009246] transition-colors">
                          {t('contact.info.phone.value')}
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 rounded-md transition-all duration-300 hover:bg-neutral-50 group">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#00924615] flex items-center justify-center transition-all duration-300 group-hover:bg-[#009246] group-hover:text-white">
                        <i className="fas fa-envelope"></i>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-neutral-800">{t('contact.info.email.label')}</h4>
                      <p className="text-neutral-600 mt-1">
                        <a href="mailto:amministrazione@proclama.co" className="hover:text-[#009246] transition-colors">
                          {t('contact.info.email.value')}
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 rounded-md transition-all duration-300 hover:bg-neutral-50 group">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#00924615] flex items-center justify-center transition-all duration-300 group-hover:bg-[#009246] group-hover:text-white">
                        <i className="fas fa-clock"></i>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-neutral-800">{t('contact.info.hours.label')}</h4>
                      <p className="text-neutral-600 mt-1">{t('contact.info.hours.value')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-heading font-semibold mb-4 relative inline-flex items-center">
                  <i className="fas fa-share-alt text-[#ce2b37] mr-2"></i>
                  <span>{t('contact.info.social')}</span>
                </h3>
                
                <div className="flex space-x-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center hover:bg-[#0077B5] hover:text-white transition-all duration-300">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all duration-300">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center hover:bg-[#4267B2] hover:text-white transition-all duration-300">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all duration-300">
                    <i className="fab fa-instagram"></i>
                  </a>
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
