<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:99|min:8',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'sub_warehouse_id' => [
                'required',
                'integer',
                Rule::exists('sub_warehouses', 'id')
            ],
        ];
    }
}
