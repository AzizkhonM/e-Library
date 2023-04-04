import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { Book } from "../../books/models/book.model"

interface AuthorAttr{
    id: number
    first_name: string
    last_name: string
    birth_year: number
    death_year: number
}

@Table({ tableName: "authors", createdAt: false, updatedAt: false })
export class Author extends Model<AuthorAttr>{

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

    @Column({
        type: DataType.INTEGER
    })
    birth_year: number

    @Column({
        type: DataType.INTEGER
    })
    death_year: string

    @HasMany(() => Book)
    books: Book[]

}