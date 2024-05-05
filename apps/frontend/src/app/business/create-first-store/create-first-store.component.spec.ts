import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFirstStoreComponent } from './create-first-store.component';

describe('CreateFirstStoreComponent', () => {
    let component: CreateFirstStoreComponent;
    let fixture: ComponentFixture<CreateFirstStoreComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateFirstStoreComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateFirstStoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
