import { Column, DataType, Model, Table } from "sequelize-typescript"

interface StaffAttr{
    id: number
    first_name: string
    last_name: string
}

@Table({ tableName: "staff", createdAt: false, updatedAt: false })
export class Staff extends Model<StaffAttr>{

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column({
        type: DataType.STRING
    })
    first_name: string

    @Column({
        type: DataType.STRING
    })
    last_name: string

}