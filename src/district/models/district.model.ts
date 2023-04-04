import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { Region } from "../../region/models/region.model"
import { Branch } from "../../branches/models/branch.model"

interface DistrictAttr{
    id: number
    name: string
    region_id: number
}
@Table({ tableName: "district", createdAt: false, updatedAt: false })
export class District extends Model<DistrictAttr>{

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column({
        type: DataType.STRING,
        unique: true
    })
    name: string

    @ForeignKey(() => Region)
    @Column({
        type: DataType.INTEGER
    })
    region_id: number
    @BelongsTo(() => Region)
    region: Region[]

    @HasMany(() => Branch)
    branches: Branch[]

}