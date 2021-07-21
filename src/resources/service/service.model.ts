import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import ServiceType from '../serviceType/serviceType.model';

@Entity('services')
export default class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ServiceType) // exemplo de relacionamento
  @JoinColumn({ name: 'service_type_id', referencedColumnName: 'id' })
  serviceType: ServiceType;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
