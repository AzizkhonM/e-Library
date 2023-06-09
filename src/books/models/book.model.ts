import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { Author } from "../../authors/models/author.model"
import { CoverType } from "../../cover_types/models/cover_type.model"
import { Category } from "../../category/models/category.model"
import { Order } from "../../orders/models/order.model"
import { Branch } from "../../branches/models/branch.model"

interface BookAttr{
    id: number
    name: string
    author_id: number
    pages: number
    publisher: string
    publication_year: number
    branch_id: number
    cover_id: number
    category_id: number
    cover_image_link: string
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

    @ForeignKey(() => Branch)
    @Column({
        type: DataType.INTEGER
    })
    branch_id: number
    @BelongsTo(() => Branch)
    branch: Branch[]

    @ForeignKey(() => CoverType)
    @Column({
        type: DataType.INTEGER
    })
    cover_id: number
    @BelongsTo(()=> CoverType)
    cover_type: CoverType[]

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER
    })
    category_id: number
    @BelongsTo(()=> Category)
    category: Category[]

    @Column({
        type: DataType.STRING
    })
    cover_image_link: string

    @HasMany(() => Order)
    orders: Order[]

}