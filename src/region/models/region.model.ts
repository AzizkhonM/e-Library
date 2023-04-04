import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { District } from "../../district/models/district.model"

interface RegionAttr{
    id: number
    name: string
}

@Table({ tableName: "region", createdAt: false, updatedAt: false })
export class Region extends Model<RegionAttr>{

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

    @HasMany(() => District)
    districts: District[]

}