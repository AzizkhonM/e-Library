import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Author } from "../../authors/models/author.model"
import { CoverType } from "../../cover_types/models/cover_type.model"

interface BookAttr{
    id: number
    name: string
    author_id: number
    pages: number
    publisher: string
    publication_year: number
    branch_id: number
    cover_id: number
}

@Table({ tableName: "books", createdAt: false, updatedAt: false })
export class Book extends Model<BookAttr>{

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column({
        type: DataType.STRING
    })
    name: string

    @ForeignKey(() => Author)
    @Column({
        type: DataType.INTEGER
    })
    author_id: number
    @BelongsTo(() => Author)
    author: Author[]

    @Column({
        type: DataType.INTEGER
    })
    pages: number

    @Column({
        type: DataType.STRING
    })
    publisher: number

    @Column({
        type: DataType.INTEGER
    })
    publication_year: number

    @Column({
        type: DataType.INTEGER
    })
    branch_id: number

    @ForeignKey(() => CoverType)
    @Column({
        type: DataType.INTEGER
    })
    cover_id: number
    @BelongsTo(()=> CoverType)
    cover_type: CoverType[]

}