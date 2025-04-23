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
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-semibold text-neutral-800 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.name')} *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.company')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
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
                        <FormLabel>{t('contact.form.email')} *</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.phone')}</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.service')} *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.message')} *</FormLabel>
                      <FormControl>
                        <Textarea rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-neutral-600">
                          {t('contact.form.privacyConsent')} <a href="#" className="text-primary hover:underline">{t('contact.form.privacyPolicy')}</a>.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <div>
                  <button 
                    type="submit" 
                    className="btn-primary disabled:opacity-70"
                    disabled={isPending}
                  >
                    {isPending ? t('contact.form.sending') : t('contact.form.send')}
                  </button>
                </div>
              </form>
            </Form>
          </div>
          
          <div>
            <div className="bg-neutral-100 p-8 rounded-lg h-full">
              <div className="mb-8">
                <h3 className="text-xl font-heading font-medium text-neutral-800 mb-4">
                  {t('contact.info.title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-neutral-800">{t('contact.info.address.title')}</h4>
                      <p className="text-neutral-600">{t('contact.info.address.value')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                        <i className="fas fa-phone-alt"></i>
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-neutral-800">{t('contact.info.phone.title')}</h4>
                      <p className="text-neutral-600">{t('contact.info.phone.value')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-neutral-800">{t('contact.info.email.title')}</h4>
                      <p className="text-neutral-600">{t('contact.info.email.value')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                        <i className="fas fa-clock"></i>
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-neutral-800">{t('contact.info.hours.title')}</h4>
                      <p className="text-neutral-600">{t('contact.info.hours.value')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-heading font-medium text-neutral-800 mb-4">
                  {t('contact.social.title')}
                </h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
              
              <div className="mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt={t('contact.info.officeImageAlt')}
                  className="w-full h-48 object-cover rounded-md shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
