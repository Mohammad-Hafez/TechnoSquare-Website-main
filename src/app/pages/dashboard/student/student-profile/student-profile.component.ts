import { StudentImageService } from './../../../../core/services/student-image.service';
import { Component } from '@angular/core';
import { StudentProfileService } from '../../../../core/services/student-profile.service';
import { Student } from '../../../../core/models/student';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrls: [
    './student-profile.component.css',
    '../../instructor/profile/instructor-profile.component.css',
  ],
  providers: [MessageService]

})
export class StudentProfileComponent {
  student!: Student;
  constructor(private studentProfileService: StudentProfileService ,private messageService: MessageService, private studentImageService: StudentImageService) {}

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    this.studentProfileService.getStudentData().subscribe({
      next: (res) => {
        this.student = res.data;
        console.log(this.student);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile_img', file, file.name);

      this.studentImageService.uploadImage(formData).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Image uploaded successfully',
          });
          this.student.image = URL.createObjectURL(file);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to upload image',
          });
          console.error(err);
        }
      });
    }
  }

}
