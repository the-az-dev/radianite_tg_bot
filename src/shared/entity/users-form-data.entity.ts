import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Table } from "typeorm";

@Entity({ name: 'users_form_data' })
export default class UserFormData{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;
    @Column({ name: 'age', type: "int" })
    age: number;
    @Column({ name: 'nickname', type: 'varchar', length: 255 })
    nickname: string;
    @Column({ name: 'agents_list', type: 'varchar', length: 512 })
    agentsList: string;
    @Column({ name: 'maps_list', type: 'varchar', length: 512 })
    mapsList: string;
    @Column({ name: 'user_lvl', type: 'int', default: 1 })
    userLvl: number;
    @Column({ name: 'rank', type: 'varchar', length: 215 })
    rank: string;
    @Column({ name: 'game_hours', type: 'bigint', default: 2})
    gameHours: number;
    @Column({ name: 'has_mic', type: 'boolean', default: 0 })
    hasMic: boolean;
    @Column({ name: 'tracker_link', type: 'varchar', length: 512 })
    trackerLink: string;
    @Column({ name: 'notes', type: 'text' })
    notes: string;
}