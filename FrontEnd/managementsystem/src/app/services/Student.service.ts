import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/Student.model';
import { Payment } from '../models/Payment.model';
import { Stu } from '../models/Stud.model';
import { StudentFee } from '../models/StudentFee.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private API = 'http://localhost:8080/studentAPI';

  constructor(private http: HttpClient) {}

  fetchStudents() {
    return this.http.get<Student[]>(`${this.API}/students`);
  }

  // Not Recommended To Use
  fetchStudentWithFee(id: number) {
    return this.http.get<Student>(`${this.API}/student-fee/${id}`);
  }

  // Recommended To Use Instead Of Above Method
  fetchStuFeeData(id: number) {
    return this.http.get<StudentFee>(`${this.API}/student-fee-excl/${id}`);
  }

  deleteStudentWithId(id: number) {
    return this.http.delete(`${this.API}/student-delete/${id}`);
  }

  insertStudentWithFeeSimple(fee: StudentFee, file) {
    const form = new FormData();
    if (file !== null) {
      form.append('file', file, file.name);
    } else {
      form.append('file', new Blob(), null);
    }
    form.append(
      'fee',
      new Blob([JSON.stringify(fee)], { type: 'application/json' })
    );
    return this.http.post(`${this.API}/student-simple`, form);
  }

  // Not Using
  insertStudentWithFee(stuDetails, feeDetails, file) {
    const form = new FormData();
    form.append('file', file, file.name);

    const overrides = {
      stuDetails,
      feeDetails,
    };

    const blobOverrides = new Blob([JSON.stringify(overrides)], {
      type: 'application/json',
    });

    form.append('data', blobOverrides);
    return this.http.post(`${this.API}/student`, form);
  }
}
