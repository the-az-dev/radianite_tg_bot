import { Column, Entity, PrimaryColumn, Table } from "typeorm";

@Entity({ name: "user" })
export default class User {
  @PrimaryColumn({ name: "user_id", type: "bigint" })
  userId: number;
  @Column({ name: "user_name", type: "varchar", length: "255" })
  username: string;
  @Column({ name: "warning_linits", type: "int", default: 3 })
  warningLimits: number;
  @Column({ name: "reputation", type: "int", default: 0 })
  reputation: number;
  @Column({ name: "mmr_reputation", type: "bigint", default: 0 })
  mmr_rep: number;
  @Column({ name: "mmr_points", type: "bigint", default: 0 })
  mmr: number;
  @Column({ name: "updated_mmr_at", type: "datetime" })
  updatedMmrAt: Date;
  @Column({ name: "updated_at", type: "datetime" })
  updatedAt: Date;

  get totalMMR() {
    return Number(this.mmr_rep) + Number(this.mmr);
  }
}
