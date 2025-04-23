import { 
  users, 
  type User, 
  type InsertUser, 
  contactSubmissions, 
  type Contact, 
  type InsertContact,
  newsletterSubscribers,
  type NewsletterSubscriber,
  type InsertNewsletterSubscriber
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(contact: InsertContact): Promise<Contact>;
  getContactSubmissions(): Promise<Contact[]>;
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  isEmailSubscribed(email: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private subscribers: Map<number, NewsletterSubscriber>;
  currentUserId: number;
  currentContactId: number;
  currentSubscriberId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.subscribers = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentSubscriberId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(contact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const createdAt = new Date();
    const contactSubmission: Contact = { 
      ...contact, 
      id, 
      createdAt
    };
    this.contacts.set(id, contactSubmission);
    return contactSubmission;
  }

  async getContactSubmissions(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    // Check if email already exists
    const exists = await this.isEmailSubscribed(subscriber.email);
    if (exists) {
      throw new Error("Email already subscribed to newsletter");
    }
    
    const id = this.currentSubscriberId++;
    const createdAt = new Date();
    const newSubscriber: NewsletterSubscriber = {
      ...subscriber,
      id,
      createdAt
    };
    this.subscribers.set(id, newSubscriber);
    return newSubscriber;
  }

  async isEmailSubscribed(email: string): Promise<boolean> {
    return Array.from(this.subscribers.values()).some(
      (subscriber) => subscriber.email.toLowerCase() === email.toLowerCase()
    );
  }
}

export const storage = new MemStorage();
