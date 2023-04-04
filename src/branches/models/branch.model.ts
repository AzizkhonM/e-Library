import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { District } from "../../district/models/district.model"

interface BranchAttr{
    id: number
    name: string
    district_id: number
    location: string
    address_name: string
    zip_code: string
}

@Table({ tableName: "branches", createdAt: false, updatedAt: false })
export class Branch extends Model<BranchAttr>{

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

    @ForeignKey(() => District)
    @Column({
        type: DataType.INTEGER
    })
    district_id: number
    @BelongsTo(() => District)
    district: District[]

    @Column({
        type: DataType.STRING,
        unique: true
    })
    location: string

    @Column({
        type: DataType.STRING,
        unique: true
    })
    address_name: string

    @Column({
        type: DataType.INTEGER
    })
    zip_code: number

}