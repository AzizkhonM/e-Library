import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { Order } from "../../orders/models/order.model"

interface UserAttr{
    id: number
    username: string
    hashed_password: string
    email: string
    hashed_token: string
    activation_link: string
    is_active: boolean
}

@Table({ tableName: "users", createdAt: false, updatedAt: false })
export class User extends Model<User, UserAttr>{

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column({
        type: DataType.STRING
    })
    username: string

    @Column({
        type: DataType.STRING,
    })
    hashed_password: string

    @Column({
        type: DataType.STRING,
        unique: true
    })
    email: string

    @Column({
        type: DataType.STRING
    })
    hashed_token: string

    @Column({
        type: DataType.STRING
    })
    activation_link: string

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean

    @HasMany(() => Order)
    orders: Order[]

}