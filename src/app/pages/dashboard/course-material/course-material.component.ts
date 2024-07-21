import { UploadMaterialService } from './../../../core/services/upload-material.service';
import { Component, Input } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CourseMaterialService } from '../../../core/services/course-material.service';
import { GetSessionsService } from '../../../core/services/get-sessions.service';
import { Session } from '../../../core/models/session';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { UserRoleService } from '../../../core/services/user-role.service';

@Component({
  selector: 'app-course-material',
  standalone: true,
  imports: [
    PdfViewerModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    DialogModule,
    ToastModule,
  ],
  templateUrl: './course-material.component.html',
  styleUrls: ['./course-material.component.css'],
  providers: [MessageService],
})

export class CourseMaterialComponent {
  @Input() id?: number;

  materials: any;
  sessions: Session[] = [];
  selectedSession: string = '';
  materialVisible: boolean = false;
  material: string = '';
  isMaterialUrlValid: boolean = true;
  userRole: string = '';

  constructor(
    private courseMaterialService: CourseMaterialService,
    private getSessionsService: GetSessionsService,
    private uploadMaterialService: UploadMaterialService,
    private userRoleService: UserRoleService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchMaterial();
    this.fetchSessions();
    this.userRole = this.userRoleService.getUserRole();
  }

  fetchSessions(): void {
    this.getSessionsService.getSessions(this.id).subscribe({
      next: (res) => {
        this.sessions = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  fetchMaterial(): void {
    this.courseMaterialService.getCourseMaterial(this.id).subscribe({
      next: (res) => {
        this.materials = res;
        console.log(res);
        
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  validateUrl(url: string): boolean {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!urlPattern.test(url);
  }

  checkMaterialValidity(): void {
    this.isMaterialUrlValid = this.validateUrl(this.material);
  }

  onSubmitMaterial(): void {
    if (!this.isMaterialUrlValid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid URL format',
      });
      return;
    }

    this.uploadMaterialService.uploadMaterial(this.selectedSession, this.material).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Material sent successfully',
        });
        this.selectedSession = '';
        this.materialVisible = false;
        this.material = '';
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to send material',
        });
        console.error(err);
      },
    });
  }

  showMaterialDialog(): void {
    this.materialVisible = true;
  }

  clearTextarea(): void {
    this.material = '';
  }
}
