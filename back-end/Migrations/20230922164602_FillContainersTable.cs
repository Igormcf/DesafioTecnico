using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_end.Migrations
{
    /// <inheritdoc />
    public partial class FillContainersTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder mb)
        {
            mb.Sql("Insert into Containers(Cliente, Numero, Tipo, Situacao, Categoria) Values('Empresa1', 'test1234567', 40, 'Vazio', 'Exportação')");
            mb.Sql("Insert into Containers(Cliente, Numero, Tipo, Situacao, Categoria) Values('Empresa2', 'test1234568', 20, 'Cheio', 'Importação')");
            mb.Sql("Insert into Containers(Cliente, Numero, Tipo, Situacao, Categoria) Values('Empresa3', 'test1234569', 40, 'Vazio', 'Exportação')");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder mb)
        {
            mb.Sql("Delete from Containers");
        }
    }
}
