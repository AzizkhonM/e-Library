import { Column, DataType, Model, Table } from "sequelize-typescript"

interface AdminAttr{
    id: number
    username: string
    hashed_password: string
    email: string
    hashed_token: string
    is_active: boolean
    is_owner: boolean
}

@Table({ tableName: "admin", createdAt: false, updatedAt: false })
export class Admin extends Model<AdminAttr>{

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
    username: string

    @Column({
        type: DataType.STRING,
    })
    hashed_password: true

    @Column({
        type: DataType.STRING,
        unique: true
    })
    email: string

    @Column({
        type: DataType.STRING,
    })
    hashed_token: string

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    is_active: boolean

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_owner: boolean

}