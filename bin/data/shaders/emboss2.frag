#define PI 3.141592653589793

#define KERNEL_SIZE 9

// Emboss kernel
// +2  0  0
//  0 -1  0
//  0  0 -1
float kernel[KERNEL_SIZE];
float kernel2[KERNEL_SIZE];
uniform sampler2DRect src_tex_unit0;
uniform vec2 src_tex_offset0;
uniform float colorShift;

vec2 offset[KERNEL_SIZE];

void main(void)
{
    int i = 0;
    vec4 sum = vec4(0.0);
    vec4 sum2 = vec4(0.0);
    vec2 uv = gl_TexCoord[0].xy;
    
    offset[0] = vec2(-src_tex_offset0.s, -src_tex_offset0.t);
    offset[1] = vec2(0.0, -src_tex_offset0.t);
    offset[2] = vec2(src_tex_offset0.s, -src_tex_offset0.t);
    
    offset[3] = vec2(-src_tex_offset0.s, 0.0);
    offset[4] = vec2(0.0, 0.0);
    offset[5] = vec2(src_tex_offset0.s, 0.0);
    
    offset[6] = vec2(-src_tex_offset0.s, src_tex_offset0.t);
    offset[7] = vec2(0.0, src_tex_offset0.t);
    offset[8] = vec2(src_tex_offset0.s, src_tex_offset0.t);
    
    kernel[0] = -1.0;   kernel[1] = -3.0;   kernel[2] = -1.0;
    kernel[3] = 0.0;   kernel[4] = 0.0;   kernel[5] = 0.0;
    kernel[6] = 1.0;   kernel[7] = 3.0;   kernel[8] = 1.0;
    
    kernel2[0] = 1.0;   kernel2[1] = 0.0;     kernel2[2] = -1.0;
    kernel2[3] = 3.0;   kernel2[4] = 0.0;      kernel2[5] = -3.0;
    kernel2[6] = 1.0;  kernel2[7] = 0.0;   kernel2[8] = -1.0;
    
    for(i = 0; i < KERNEL_SIZE; i++)
    {
        vec4 tmp;
        tmp.r = texture2DRect(src_tex_unit0, vec2(uv.x + 0.0 + offset[i].x, uv.y + offset[i].y)).x;
        tmp.g = texture2DRect(src_tex_unit0, vec2(uv.x + 0.0 + offset[i].x, uv.y + offset[i].y)).y;
        tmp.b = texture2DRect(src_tex_unit0, vec2(uv.x - 0.0 + offset[i].x, uv.y + offset[i].y)).z;
        sum += tmp * kernel[i] ;
        sum2 += tmp * kernel2[i];
        
        
    }
    //vec4 n = vec4(normalize(sum2+sum));
    //vec4 orig = texture2DRect(src_tex_unit0, gl_TexCoord[0].st);
//    vec4 combine = mix(sum,sum2,0.5);
    vec4 color = vec4(vec3(sum.rgb+sum2.rgb)*0.5,1.0);
    
//    color.rgb = normalize(color.rgb);
    //sum.r += texture2DRect(src_tex_unit0, vec2(uv.x+0.0,uv.y)).x;
    //sum.g += texture2DRect(src_tex_unit0, vec2(uv.x+0.000,uv.y)).y;
    //sum.b += texture2DRect(src_tex_unit0, vec2(uv.x-0.0,uv.y)).z;

    //vec4 s = vec4(normalize(sum));
    
    gl_FragColor =vec4(color.rgb , 1.0) - vec4(vec3(1.0), 0.0);
}