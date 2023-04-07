import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "../../users/models/user.model"
import { Book } from "../../books/models/book.model"

interface OrderAttr{
    id: number
    user_id: number
    book_id: number
    given_date: string
    return_date: string
}

@Table({ tableName: "orders", createdAt: false, updatedAt: false })
export class Order extends Model<OrderAttr>{

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    user_id: number
    @BelongsTo(() => User)
    user: User[]

    @ForeignKey(() => Book)
    @Column({
        type: DataType.INTEGER
    })
    book_id: number
    @BelongsTo(() => Book)
    book: Book[]

    @Column({
        type: DataType.STRING
    })
    given_date: string

    @Column({
        type: DataType.STRING
    })
    return_date: string

}