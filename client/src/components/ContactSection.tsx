import { useTranslation } from 'react-i18next';
import { useState, useMemo, useEffect } from 'react';
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
  faPhoneAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedinIn,
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

  const contactFormSchema = useMemo(() => z.object({
    name: z.string().min(1, { message: t('contact.form.validation.nameRequired') || 'Name is required' }),
    company: z.string().optional(),
    email: z.string().email({ message: t('contact.form.validation.emailInvalid') || 'Invalid email address' }),
    phone: z.string().optional(),
    service: z.string().min(1, { message: t('contact.form.validation.serviceRequired') || 'Please select a service' }),
    message: z.string().min(10, { message: t('contact.form.validation.messageLength') || 'Message must be at least 10 characters' }),
    privacy: z.boolean().refine(val => val === true, {
      message: t('contact.form.validation.privacyRequired') || 'You must accept the privacy policy',
    }),
  }), [t, i18n.language]);

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

  useEffect(() => {
    form.clearErrors();
  }, [i18n.language, form]);

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
    <section id="contact" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-italian-green font-bold tracking-widest text-xs uppercase mb-3 block">Get Started Today</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Let's Start Your Success Story
          </h2>
          <div className="w-16 h-1 bg-italian-green mx-auto mb-6"></div>
          
          <p className="text-gray-600 text-sm max-w-2xl mx-auto leading-relaxed italic">
            "{t('contact.subtitle')}"
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Form Side */}
          <div className="bg-gray-50 p-8 rounded-sm shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-navy mb-2">
              {t('contact.form.title')}
            </h3>
            <p className="text-gray-500 mb-8 text-sm">We typically reply within 24 hours.</p>
            
            <Form {...form}>
              <form onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
              }} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          {t('contact.form.name')} <span className="text-italian-red">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            className="bg-white border-gray-200 focus:ring-italian-green focus:border-italian-green" 
                            placeholder="Your Name"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          {t('contact.form.company')}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            className="bg-white border-gray-200 focus:ring-italian-green focus:border-italian-green" 
                            placeholder="Company Name"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
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
                        <FormLabel className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          {t('contact.form.email')} <span className="text-italian-red">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            className="bg-white border-gray-200 focus:ring-italian-green focus:border-italian-green" 
                            type="email" 
                            placeholder="email@example.com"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          {t('contact.form.phone')}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            className="bg-white border-gray-200 focus:ring-italian-green focus:border-italian-green" 
                            type="tel" 
                            placeholder="+1 234 567 890"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        {t('contact.form.service')} <span className="text-italian-red">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white border-gray-200 focus:ring-italian-green focus:border-italian-green">
                            <SelectValue placeholder={t('contact.form.selectServicePlaceholder') || 'Select a service...'} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="company_formation">{t('services.items.formation.title') || 'Company Formation'}</SelectItem>
                          <SelectItem value="accounting">{t('services.items.accounting.title') || 'Accounting'}</SelectItem>
                          <SelectItem value="tax_consulting">{t('services.items.tax.title') || 'Tax Consulting'}</SelectItem>
                          <SelectItem value="business_planning">{t('services.items.planning.title') || 'Business Planning'}</SelectItem>
                          <SelectItem value="payroll_hr">{t('services.items.payroll.title') || 'Payroll & HR'}</SelectItem>
                          <SelectItem value="legal_support">{t('services.items.legal.title') || 'Legal Support'}</SelectItem>
                          <SelectItem value="private_clients">{t('services.items.private_clients.title') || 'Private Clients'}</SelectItem>
                          <SelectItem value="freelancer">{t('services.items.freelancer.title') || 'Freelancer Services'}</SelectItem>
                          <SelectItem value="relocation">{t('services.items.relocation.title') || 'Relocation Support'}</SelectItem>
                          <SelectItem value="facilitated_finance">{t('services.items.facilitated_finance.title') || 'Facilitated Finance'}</SelectItem>
                          <SelectItem value="agriculture">{t('services.items.agriculture.title') || 'Agriculture Consulting'}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        {t('contact.form.message')} <span className="text-italian-red">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          className="bg-white border-gray-200 focus:ring-italian-green focus:border-italian-green min-h-[120px]" 
                          rows={4} 
                          placeholder="How can we help you?"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
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
                          className="border-gray-300 data-[state=checked]:bg-italian-green data-[state=checked]:border-italian-green rounded-sm"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-500 font-normal">
                          {t('contact.form.privacyConsent')} <a href="#" className="text-italian-green hover:underline font-medium">{t('contact.form.privacyPolicy')}</a>.
                        </FormLabel>
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-italian-green text-white font-bold text-sm uppercase tracking-wider py-4 rounded-sm hover:bg-italian-green/90 transition-colors shadow-sm flex items-center justify-center gap-2"
                    disabled={isPending}
                  >
                    {isPending ? t('contact.form.sending') : t('contact.form.send')}
                    <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
                  </button>
                </div>
              </form>
            </Form>
          </div>
          
          {/* Info Side */}
          <div className="flex flex-col justify-center">
             
             {/* Office Image */}
             <div className="bg-white rounded-sm overflow-hidden shadow-md mb-10 border border-gray-200">
                <div className="relative">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Your Business in Italy Office - Catania, Italy"
                    className="w-full h-auto object-cover"
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-sm shadow-sm">
                    <div className="flex items-center text-italian-green mb-1">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                      <h4 className="text-navy font-bold text-sm">Headquarters</h4>
                    </div>
                    <p className="text-gray-600 text-xs uppercase tracking-widest">Catania, Italy</p>
                  </div>
                </div>
              </div>
              
             <div className="space-y-8 pl-4 lg:pl-0">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-italian-green/5 flex items-center justify-center text-italian-green mr-4 flex-shrink-0">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-2">{t('contact.info.address.label')}</h4>
                    <p className="text-lg text-navy leading-relaxed">
                      {t('contact.info.address.value')}
                    </p>
                  </div>
                </div>
                  
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-italian-green/5 flex items-center justify-center text-italian-green mr-4 flex-shrink-0">
                    <FontAwesomeIcon icon={faPhoneAlt} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-2">{t('contact.info.contact.label') || 'DIRECT CONTACT'}</h4>
                    <p className="text-lg text-navy mb-1">
                      <a href="tel:+39095643533" className="hover:text-italian-green transition-colors">{t('contact.info.phone.value')}</a>
                    </p>
                    <p className="text-lg text-navy">
                      <a href="mailto:amministrazione@proclama.co" className="hover:text-italian-green transition-colors">amministrazione@proclama.co</a>
                    </p>
                  </div>
                </div>
              
                <div>
                   <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-4 ml-14">{t('contact.info.social')}</h4>
                   <div className="flex space-x-4 ml-14">
                  {[
                        { icon: faLinkedinIn, url: "https://www.linkedin.com/company/partitaiva" },
                        { icon: faInstagram, url: "https://www.instagram.com/partitaiva.it/" },
                        { icon: faYoutube, url: "https://www.youtube.com/channel/UCggYXro7p7chs4MvrMcLSvg" }
                  ].map((social, idx) => (
                    <a 
                      key={idx}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                          className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-white hover:bg-italian-green hover:border-italian-green transition-all duration-300 rounded-sm"
                    >
                          <FontAwesomeIcon icon={social.icon} />
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
