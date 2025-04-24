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
  const { t } = useTranslation();
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
      const response = await apiRequest('POST', '/api/contact', contactData);
      return response.json();
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

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    mutate(values);
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
            {'Hai domande sui nostri servizi o desideri una consulenza? Compila il modulo di contatto e il nostro team ti risponderà al più presto.'}
          </p>
          
          {/* Badge decorativo */}
          <div className="max-w-xs mx-auto mt-8 mb-4 flex items-center justify-center">
            <span className="h-px w-12 bg-neutral-200"></span>
            <div className="mx-4 px-4 py-1 rounded-full border border-neutral-200 text-xs text-neutral-500 font-medium">
              {'Contattaci'} 
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
              
              <h3 className="text-2xl font-heading font-semibold mb-6 relative inline-block">
                <span className="relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-[#009246]">
                  {'Modulo di Contatto'}
                </span>
              </h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
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
                          {t('contact.form.service')} <span className="text-[#ce2b37]">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-neutral-200 focus:border-primary shadow-sm rounded-md">
                              <SelectValue placeholder={t('contact.form.servicePlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="costituzione">{t('contact.form.services.formation')}</SelectItem>
                            <SelectItem value="contabilita">{t('contact.form.services.accounting')}</SelectItem>
                            <SelectItem value="fiscale">{t('contact.form.services.tax')}</SelectItem>
                            <SelectItem value="planning">{t('contact.form.services.planning')}</SelectItem>
                            <SelectItem value="payroll">{t('contact.form.services.payroll')}</SelectItem>
                            <SelectItem value="legale">{t('contact.form.services.legal')}</SelectItem>
                            <SelectItem value="altro">{t('contact.form.services.other')}</SelectItem>
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
                  alt={'Ufficio principale di DoBusinessNew'}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{'Sede centrale di Milano'}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-heading font-semibold mb-6 relative inline-block">
                  <span className="relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-[#ce2b37]">
                    {'Informazioni di Contatto'}
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
                      <h4 className="font-semibold text-neutral-800">{'Indirizzo'}</h4>
                      <p className="text-neutral-600 mt-1">{'Via Dante 12, 20121 Milano, Italia'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 rounded-md transition-all duration-300 hover:bg-neutral-50 group">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#00924615] flex items-center justify-center transition-all duration-300 group-hover:bg-[#009246] group-hover:text-white">
                        <i className="fas fa-phone-alt"></i>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-neutral-800">{'Telefono'}</h4>
                      <p className="text-neutral-600 mt-1">
                        <a href="tel:+390245678901" className="hover:text-[#009246] transition-colors">
                          {'+39 02 4567 8901'}
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
                      <h4 className="font-semibold text-neutral-800">{t('contact.info.email.title')}</h4>
                      <p className="text-neutral-600 mt-1">
                        <a href={`mailto:${t('contact.info.email.value')}`} className="hover:text-[#009246] transition-colors">
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
                      <h4 className="font-semibold text-neutral-800">{t('contact.info.hours.title')}</h4>
                      <p className="text-neutral-600 mt-1">{t('contact.info.hours.value')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-heading font-semibold mb-4 relative inline-flex items-center">
                  <i className="fas fa-share-alt text-[#ce2b37] mr-2"></i>
                  <span>{t('contact.social.title')}</span>
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
