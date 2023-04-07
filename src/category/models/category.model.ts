import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { Book } from "../../books/models/book.model"

interface CategoryAttr{
    id: number
    name: string
}

@Table({ tableName: "category", createdAt: false, updatedAt: false })
export class Category extends Model<CategoryAttr>{

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

    @HasMany(() => Book)
    books: Book[]

}