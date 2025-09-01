
export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  phone?: string
  bio?: string
  avatar?: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: number
  name: string
  description?: string
  icon?: string
  createdAt: string
}

export interface Project {
  id: number
  title: string
  description: string
  shortDescription?: string
  image?: string
  goalAmount: number
  currentAmount: number
  endDate: string
  isActive: boolean
  isFeatured: boolean
  location?: string
  createdAt: string
  updatedAt?: string
  creatorId?: number
  categoryId?: number
  creator: {
    id: number
    firstName: string
    lastName: string
    avatar?: string
    bio?: string
  }
  category: Category
  donationCount?: number
  progressPercentage?: number
}

export interface Donation {
  id: number
  amount: number
  isAnonymous: boolean
  paypalOrderId?: string
  paypalStatus?: string
  message?: string
  createdAt: string
  donorId: number
  projectId: number
  donor?: User
  project?: Project
}

export interface Comment {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  authorId: number
  projectId: number
  author: {
    id: number
    firstName: string
    lastName: string
    avatar?: string
  }
  project?: Project
}

export interface PayPalOrder {
  id: string
  status: string
  payment_source?: {
    paypal?: {
      email_address?: string
      account_id?: string
    }
  }
  purchase_units: Array<{
    amount: {
      currency_code: string
      value: string
    }
    description?: string
  }>
  create_time: string
}

export interface DashboardStats {
  totalProjects: number
  activeProjects: number
  totalRaised: number
  totalDonations: number
  totalDonors: number
}

