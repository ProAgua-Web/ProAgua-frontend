export interface ReferenciaDto {
  min_temperatura?: number | null;
  max_temperatura?: number | null;
  min_cloro_residual_livre?: number | null;
  max_cloro_residual_livre?: number | null;
  min_turbidez?: number | null;
  max_turbidez?: number | null;
  min_cor?: number | null;
  max_cor?: number | null;
  coliformes_totais: boolean;
  escherichia: boolean;
}
