import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { UserService } from './users.service';
import { UserDoc } from '../../models/ddbb.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers()', () => {
    it('should return an Observable of users', () => {
      const mockUsers: UserDoc[] = [
        {
          id: '1',
          password: '450200',
          email: 'example@example.com',
          address: {
            street: '',
            zip: '',
            city: '',
            province: ''
          },
          name: 'User 1'
        }
      ];

      service.getUsers().subscribe((users) => {
        expect(users.length).toBe(1);
        expect(users).toEqual(mockUsers);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/users`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });
  });
});
