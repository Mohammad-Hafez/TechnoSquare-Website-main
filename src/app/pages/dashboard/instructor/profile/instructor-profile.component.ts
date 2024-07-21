import { InstructorImageService } from './../../../../core/services/instructor-image.service';
import { InstructorProfileService } from '../../../../core/services/instructor-profile.service';
import { Instructor } from '../../../../core/models/instructor';
import { Component, OnInit } from '@angular/core';
import { AgeCalculatorService } from '../../../../core/services/calc-age.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-instructor-profile',
  standalone: true,
  imports: [RouterLink, CommonModule, TableModule],
  templateUrl: './instructor-profile.component.html',
  styleUrl: './instructor-profile.component.css',
  providers: [MessageService]
})
export class InstructorProfileComponent implements OnInit {
  instructor!: Instructor;
  constructor(private instructorProfileService: InstructorProfileService ,private instructorImageService:InstructorImageService , private messageService: MessageService) {}

  ngOnInit(): void {
    this.getInstructor();
  }

  getInstructor(): void {
    this.instructorProfileService.getInstructorData().subscribe({
      next: (res) => {
        this.instructor = res.data;
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

      this.instructorImageService.uploadImage(formData).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Image uploaded successfully',
          });
          this.instructor.image = URL.createObjectURL(file);
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