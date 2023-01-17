import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Employee } from '../shared/employee';
import { ApiService } from '../services/api.service';

describe('EmployeeApiServiceMock', () => {

    const expectedEmployees = [
        {
            id: 1,
            firstname: "Simon",
            surname: "Meier",
            position: "Projectmanager",
            salary: 2200
        },
        {
            id: 2,
            firstname: "Simone",
            surname: "Huber",
            position: "Projectmanager",
            salary: 3000
        }
    ];

    let httpMock: { get: () => Observable<Employee[]> };

    beforeEach(() => {

        httpMock = {
            get: () => of(expectedEmployees)
        };

        spyOn(httpMock, 'get').and.callThrough();

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: HttpClient,
                    useValue: httpMock
                },
                ApiService
            ]
        });
    });

    it('should GET a list of all employees',
        inject([ApiService], (service: ApiService) => {

            let receivedEmployees: Employee[] = [];
            service.getAllEmployees().subscribe(b => receivedEmployees = b);

            expect(receivedEmployees.length).toBe(2);
            expect(receivedEmployees[0].firstname).toBe('Simon');
            expect(receivedEmployees[1].surname).toBe('Huber');

            expect(httpMock.get).toHaveBeenCalledTimes(1);
        }));
});

describe('EmmployeeApiService', () => {
    let service: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService],
        });

        service = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should get a single Employee', () => {
        service.getSingleEmployees(5).subscribe((data: any) => {
            expect(data.id).toBe(5);
        });

        const req = httpMock.expectOne(`http://employeeapi.local.com/api/employee/5`, 'call to api');
        expect(req.request.method).toBe('GET');

        httpMock.verify();
    });

    it('should update a single Employee', () => {
        service.update({id: 5, firstname: "Simon", surname: "Meier", position: "Projectmanager", salary: 2200 }).subscribe((data: any) => {
            expect(data.id).toBe(5);
        });

        const req = httpMock.expectOne(
            `http://employeeapi.local.com/api/employee/5`,
            'update to api'
        );
        expect(req.request.method).toBe('PUT');

        httpMock.verify();
    });

    /*it('should remove a single Employee', () => {
        service.remove(8).subscribe((data: any) => {
            expect(data).toBe('8');
        });

        const req = httpMock.expectOne(
            `http://employeeapi.local.com/api/employee/8`,
            'delete to api'
        );
        expect(req.request.method).toBe('DELETE');

        req.flush(8);

        httpMock.verify();
    });*/

    
});