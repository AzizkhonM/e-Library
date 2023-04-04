import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { Book } from "../../books/models/book.model"

interface CoverTypeAttr{
    id: number
    name: string
}

@Table({ tableName: "covertypes", createdAt: false, updatedAt: false })
export class CoverType extends Model<CoverTypeAttr>{

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