using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_end.Migrations
{
    /// <inheritdoc />
    public partial class FillMovementsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder mb)
        {
            mb.Sql("Insert into Movements(Tipo, DataInicio, DataFim, ContainerId) Values('Embarque', '20/09/2023', '21/09/2023', 1)");
            mb.Sql("Insert into Movements(Tipo, DataInicio, DataFim, ContainerId) Values('Descarga', '19/09/2023', '20/09/2023', 2)");
            mb.Sql("Insert into Movements(Tipo, DataInicio, DataFim, ContainerId) Values('Gate in', '17/09/2023', '19/09/2023', 3)");
            mb.Sql("Insert into Movements(Tipo, DataInicio, DataFim, ContainerId) Values('Gate out', '15/08/2023', '17/08/2023', 1)");
            mb.Sql("Insert into Movements(Tipo, DataInicio, DataFim, ContainerId) Values('Reposicionamento', '05/07/2023', '07/07/2023', 2)");
            mb.Sql("Insert into Movements(Tipo, DataInicio, DataFim, ContainerId) Values('Pesagem', '20/05/2023', '21/05/2023', 3)");
            mb.Sql("Insert into Movements(Tipo, DataInicio, DataFim, ContainerId) Values('Scanner', '03/02/2023', '04/02/2023', 1)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder mb)
        {
            mb.Sql("Delete from Movements");
        }
    }
}
