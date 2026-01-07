// Mock database - Replace with real database in production
let users: any[] = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    phone: "+1234567890",
    gender: "Male",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
];

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  gender: string;
  plan?: string;
  numberOfPersons?: number;
  totalAmount?: string;
  referralCode?: string | null;
  createdAt: string;
  isActive: boolean;
}

export function getUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function createUser(userData: Partial<User>): User {
  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    email: userData.email || "",
    phone: userData.phone || "",
    password: userData.password || "",
    gender: userData.gender || "",
    plan: userData.plan,
    numberOfPersons: userData.numberOfPersons,
    totalAmount: userData.totalAmount,
    referralCode: userData.referralCode || null,
    createdAt: new Date().toISOString(),
    isActive: true,
  };

  users.push(newUser);
  return newUser;
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) return null;

  users[userIndex] = { ...users[userIndex], ...updates };
  return users[userIndex];
}

export function deleteUser(id: string): boolean {
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) return false;

  users.splice(userIndex, 1);
  return true;
}

export function userExists(email: string): boolean {
  return users.some((u) => u.email === email);
}

export function getAllUsers(): User[] {
  return users.map(({ password, ...user }) => user);
}
