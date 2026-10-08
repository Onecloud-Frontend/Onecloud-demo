import { Employee, Department } from '@features/hrms/types';
import { mockDepartments, mockEmployees } from './employeeMockData';

/**
 * Universal HRMS Mock Store
 * Lightweight reactive store focused on Employee Management
 * Supports pub/sub reactivity for Employee Directory updates.
 */
class UniversalHrmsStore {
  private static readonly STORAGE_KEY = 'onecloud_hrms_master_db_v2';
  public employees: Employee[] = [];
  public departments: Department[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.initStore();
  }

  private initStore(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = window.localStorage.getItem(UniversalHrmsStore.STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed.employees) && parsed.employees.length > 0) {
            this.employees = parsed.employees;
            this.departments = Array.isArray(parsed.departments) && parsed.departments.length > 0
              ? parsed.departments
              : [...mockDepartments];
            return;
          }
        }
      } catch {
        // ignore JSON parse failure
      }
    }
    this.employees = [...mockEmployees];
    this.departments = [...mockDepartments];
    this.persist();
  }

  private persist(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(
          UniversalHrmsStore.STORAGE_KEY,
          JSON.stringify({
            employees: this.employees,
            departments: this.departments,
          })
        );
      } catch {
        // ignore storage errors
      }
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public notify(): void {
    this.persist();
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('HRMS Store listener error:', err);
      }
    });
  }

  public getEmployees(): Employee[] {
    return [...this.employees];
  }

  public getDepartments(): Department[] {
    return [...this.departments];
  }

  public setEmployees(employees: Employee[]): void {
    this.employees = employees;
    this.notify();
  }
}

export const universalHrmsStore = new UniversalHrmsStore();
